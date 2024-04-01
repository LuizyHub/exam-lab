package capstone.examlab.questions.service;

import capstone.examlab.questions.dto.QuestionsList;
import capstone.examlab.questions.dto.search.QuestionsSearch;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface QuestionsService {
    boolean addQuestionsByExamId(Long examId, QuestionUploadInfo questionUploadInfo, List<MultipartFile> questionImagesIn, List<MultipartFile> questionImagesOut, List<MultipartFile> commentaryImagesIn, List<MultipartFile> commentaryImagesOut );

    QuestionsList searchFromQuestions(Long examId, QuestionsSearch questionsSearch);

    boolean updateQuestionsByUUID(QuestionUpdateDto questionsUpdateDto);

    boolean deleteQuestionsByExamId(Long examId);

    boolean deleteQuestionsByUuidList(String uuid);
}
