package capstone.examlab.exams.service;

import capstone.examlab.exams.domain.Exam;
import capstone.examlab.exams.dto.*;
import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.exhandler.exception.UnauthorizedException;
import capstone.examlab.users.domain.User;
import capstone.examlab.valid.ValidExamId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamsService {

    private final ObjectProvider<Exam> examProvider;
    private final ExamRepository examRepository;

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
    public List<ExamDto> getExamList(User user) {
        List<ExamDto> examList = new ArrayList<>();
        examRepository.findAll()
                .stream().filter(exam -> ((Exam)exam).getUser() == null || (user != null && ((Exam)exam).getUser().equals(user)))
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

        examRepository.save(exam);
    }
}
