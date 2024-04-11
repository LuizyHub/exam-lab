package capstone.examlab.questions.service;

import capstone.examlab.questions.dto.QuestionsListDto;
import capstone.examlab.questions.dto.search.QuestionsSearchDto;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface QuestionsService {
    boolean addQuestionsByExamId(Long examId, QuestionUploadInfo questionUploadInfo, List<MultipartFile> questionImagesIn, List<MultipartFile> questionImagesOut, List<MultipartFile> commentaryImagesIn, List<MultipartFile> commentaryImagesOut );

    QuestionsListDto searchFromQuestions(Long examId, QuestionsSearchDto questionsSearchDto);

    boolean updateQuestionsByQuestionId(QuestionUpdateDto questionsUpdateDto);

    boolean deleteQuestionsByExamId(Long examId);

    boolean deleteQuestionsByQuestionId(String questionId);
}
