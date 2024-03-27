package capstone.examlab.questions.service;

import capstone.examlab.image.dto.ImagesUploadInfo;
import capstone.examlab.questions.dto.ImageSave;
import capstone.examlab.questions.dto.upload.QuestionsUpload;

import java.util.List;


public interface QuestionsService {
   void addQuestionsByExamId(Long examId, QuestionsUpload questionsUpload);

    boolean addImageInQuestions(ImagesUploadInfo imagesUploadInfo);
    //QuestionsList findByDriverLicenseQuestions(Long examId, QuestionsSearch questionsSearch);
}
