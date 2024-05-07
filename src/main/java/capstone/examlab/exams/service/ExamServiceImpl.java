package capstone.examlab.exams.service;

import capstone.examlab.ai.AiService;
import capstone.examlab.ai.dto.Question;
import capstone.examlab.ai.dto.Questions;
import capstone.examlab.exams.domain.Exam;
import capstone.examlab.exams.dto.*;
import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.exhandler.exception.UnauthorizedException;
import capstone.examlab.pdf.PDFService;
import capstone.examlab.questions.dto.QuestionsListDto;
import capstone.examlab.questions.service.QuestionsService;
import capstone.examlab.users.domain.User;
import capstone.examlab.valid.ValidExamId;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Service;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamsService {

    private final ObjectProvider<Exam> examProvider;
    private final ExamRepository examRepository;
    private final PDFService pdfService;
    private final QuestionsService questionsService;
    private final AiService aiService;

    private static final String[] fileTypeList = {"text/plain", "text/markdown", "application/pdf"};


    @Override
    public ExamDetailDto getExamType(@ValidExamId Long id, User user) {
        // id 검증은 이미 controller에서 수행하므로 생략
        // get()으로 가져오는 것은 Optional이기 때문에 null이 아님을 보장
        Exam exam = (Exam) examRepository.findByExamId(id).get();
        
        if (user == null) {
            if (exam.getUser() != null) {
                throw new UnauthorizedException();
            }
        }
        else {
            if (exam.getUser()!=null && !user.equals(exam.getUser())) {
                throw new UnauthorizedException();
            }
        }

        Map<String, List<String>> types = exam.getTypes();

        ExamDetailDto examDetailDto = new ExamDetailDto(types);
        examDetailDto.setExamTitle(exam.getExamTitle());
        return examDetailDto;
    }

    @Override
    public List<ExamDto> getExamList(User user, boolean sample) {
        List<ExamDto> examList = new ArrayList<>();
        examRepository.findAll()
                .stream().filter(exam -> {
                    User examUser = ((Exam) exam).getUser();
                    if (examUser == null) {
                        return sample;
                    }
                    else {
                        if (user == null) return false;
                        else {
                            return examUser.equals(user);
                        }
                    }
                })
                .forEach(exam -> {
                    examList.add(ExamDto.builder()
                            .examTitle(((Exam)exam).getExamTitle())
                            .examId(((Exam)exam).getExamId())
                            .build());
                });
        return examList;
    }

    @Override
    public Long createExam(ExamAddDto examAddDto, User user) {
        Exam exam = examProvider.getObject();

        exam.setExamTitle(examAddDto.getExamTitle());
        exam.setTypes(examAddDto.getTags());
        exam.setUser(user);

        exam = examRepository.save(exam);
        return exam.getExamId();
    }

    @Override
    public void deleteExam(Long id, User user) {
        // id 검증은 이미 controller에서 수행하므로 생략
        // get()으로 가져오는 것은 Optional이기 때문에 null이 아님을 보장
        Exam exam = (Exam) examRepository.findByExamId(id).get();

        if (!user.equals(exam.getUser())) {
            throw new UnauthorizedException();
        }

        if (exam.getUser().getUserId().equals(user.getUserId())) {
            examRepository.delete(exam);
        }
    }

    @Override
    public void updateExam(Long id, ExamUpdateDto examUpdateDto, User user) {
        // id 검증은 이미 controller에서 수행하므로 생략
        // get()으로 가져오는 것은 Optional이기 때문에 null이 아님을 보장
        Exam exam = (Exam) examRepository.findByExamId(id).get();

        if (!user.equals(exam.getUser())) {
            throw new UnauthorizedException();
        }

        exam.setTypes(examUpdateDto.getTags());

        exam.setExamTitle(examUpdateDto.getExamTitle());

        examRepository.save(exam);
    }

    @Override
    public boolean isExamOwner(Long examId, User user) {
        Exam exam = (Exam) examRepository.findByExamId(examId).get();
        if(exam.getUser() == null) return false;
        return exam.getUser().getUserId().equals(user.getUserId());
    }

    @Override
    public FileGetResponseDto getExamFileTitle(Long examId, User user) {

        if (!isExamOwner(examId, user)) {
            throw new UnauthorizedException();
        }

        Exam exam = (Exam) examRepository.findByExamId(examId).get();

        if (!exam.isFileExist()) {
            return FileGetResponseDto.EMPTY;
        }

        return FileGetResponseDto.builder()
                .isExist(true)
                .fileTitle(exam.getFileTitle())
                .build();
    }

    @Override
    public void saveExamFile(Long examId, MultipartFile file, User user) throws BadRequestException {
        if (!isExamOwner(examId, user)) {
            throw new UnauthorizedException();
        }

        Exam exam = (Exam) examRepository.findByExamId(examId).get();

        if (exam.isFileExist()) {
            throw new BadRequestException("이미 파일이 존재합니다.");
        }

        String fileType = file.getContentType();

        if (!PatternMatchUtils.simpleMatch(fileTypeList, fileType)) {
            throw new BadRequestException("지원하지 않는 파일 형식입니다.");
        }

        String fileTitle = file.getOriginalFilename();
        String fileText = getFieldText(file, fileType);
        //글자 수 유효검증
        validateFileText(fileText);

        exam.setFile(fileTitle, fileText);
        examRepository.save(exam);
    }

    @Override
    public void deleteExamFile(Long examId, User user) {
        if (!isExamOwner(examId, user)) {
            throw new UnauthorizedException();
        }

        Exam exam = (Exam) examRepository.findByExamId(examId).get();
        exam.deleteFile();
        examRepository.save(exam);
    }

    @Override
    public QuestionsListDto getAiQuestions(Long examId, User user) throws BadRequestException {
        if (!isExamOwner(examId, user)) {
            throw new UnauthorizedException();
        }

        Exam exam = (Exam) examRepository.findByExamId(examId).get();

        if (!exam.isFileExist()) {
            throw new BadRequestException("파일이 존재하지 않습니다.");
        }

        // TODO: AI 서비스 연동
        String content = exam.getFileText();
        Questions questions;
        try {
            questions = aiService.generateQuestions(content);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("AI 서비스 호출 중 오류가 발생했습니다.");
        }

        QuestionsListDto questionsListDto = questionsService.addAIQuestionsByExamId(examId, questions.getQuestions().stream().map(Question::toQuestionUpdateDto).toList());

        return questionsListDto;
    }

    private String getFieldText(MultipartFile file, String fileType) {
        if (fileType.equals("text/plain") || fileType.equals("text/markdown")) {
            try {
                return new String(file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        else if (fileType.equals("application/pdf")) {
            return pdfService.getTextFromPDF(file);
        }
        return null;
    }

    private void validateFileText(String fileText) throws BadRequestException {
        if (fileText == null || fileText.trim().isEmpty()) {
            throw new BadRequestException("생성에 필요한 파일의 내용이 없습니다.");
        }

        String[] words = fileText.split("\\s+");
        int wordCount = words.length;

        if (wordCount < 20) {
            throw new BadRequestException("생성에 필요한 파일의 단어 수가 부족합니다.");
        }
    }
}
