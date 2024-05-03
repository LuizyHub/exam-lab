package capstone.examlab.questions.service;

import capstone.examlab.questions.dto.QuestionDto;
import capstone.examlab.questions.dto.QuestionsListDto;
import capstone.examlab.questions.dto.search.QuestionsSearchDto;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import capstone.examlab.users.domain.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface QuestionsService {
    QuestionsListDto addAIQuestionsByExamId(Long examId, List<QuestionUpdateDto> questionsUpdateListDto);

    QuestionDto addQuestionsByExamId(User user, Long examId, QuestionUploadInfo questionUploadInfo, List<MultipartFile> questionImagesIn, List<MultipartFile> questionImagesOut, List<MultipartFile> commentaryImagesIn, List<MultipartFile> commentaryImagesOut );

    QuestionsListDto searchFromQuestions(Long examId, QuestionsSearchDto questionsSearchDto);

    Long getExamIDFromQuestion(String questionId);

    boolean updateQuestionsByQuestionId(User user, QuestionUpdateDto questionsUpdateDto);

    boolean deleteQuestionsByExamId(Long examId);

    boolean deleteQuestionsByQuestionId(User user, String questionId);
}
