package capstone.examlab.questions.service;

import capstone.examlab.questions.dto.ImageSave;
import capstone.examlab.questions.dto.upload.QuestionsUpload;

import java.util.List;


public interface QuestionsService {
   void addQuestionsByExamId(Long examId, QuestionsUpload questionsUpload);

    //QuestionsList findByDriverLicenseQuestions(Long examId, QuestionsSearch questionsSearch);

    List<String> saveImages(ImageSave imageSave);

    void deleteImages(String imageName);
}
