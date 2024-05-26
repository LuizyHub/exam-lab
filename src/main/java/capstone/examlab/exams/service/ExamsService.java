package capstone.examlab.exams.service;

import capstone.examlab.exams.dto.*;
import capstone.examlab.questions.dto.QuestionsListDto;
import capstone.examlab.users.domain.User;
import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ExamsService {

    public ExamDetailDto getExamType(Long id, User user);

    public List<ExamDto> getExamList(User user, boolean sample);

    Long createExam(ExamAddDto examAddDto, User user);

    public void deleteExam(Long id, User user);

    public void updateExam(Long id, ExamUpdateDto examUpdateDto, User user);

    public boolean isExamOwner(Long examId, User user);

    public FileGetResponseDto getExamFileTitle(Long examId, User user);

    public void saveExamFile(Long examId, MultipartFile file, User user) throws BadRequestException;

    public void deleteExamFile(Long examId, User user);

    public QuestionsListDto getAiQuestions(Long examId, User user) throws BadRequestException;
}
