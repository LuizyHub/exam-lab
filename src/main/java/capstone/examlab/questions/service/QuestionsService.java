package capstone.examlab.questions.service;

import capstone.examlab.image.dto.ImagesUploadInfo;
import capstone.examlab.questions.dto.ImageSave;
import capstone.examlab.questions.dto.QuestionsList;
import capstone.examlab.questions.dto.search.QuestionsSearch;
import capstone.examlab.questions.dto.update.QuestionsUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUpload;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import capstone.examlab.questions.dto.upload.QuestionsUpload;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface QuestionsService {
    boolean addQuestionsByExamId(Long examId, QuestionUploadInfo questionUploadInfo, List<MultipartFile> questionImagesIn, List<MultipartFile> questionImagesOut, List<MultipartFile> commentaryImagesIn, List<MultipartFile> commentaryImagesOut );

    //void addQuestionsByExamId(Long examId, QuestionsUpload questionsUpload);

    //boolean addImageInQuestions(ImagesUploadInfo imagesUploadInfo);

    QuestionsList searchFromQuestions(Long examId, QuestionsSearch questionsSearch);

    boolean updateQuestionsByUUID(QuestionsUpdateDto questionsUpdateDto);

    boolean deleteQuestionsByExamId(Long examId);

    boolean deleteQuestionsByUuidList(List<String> uuidList);
}
