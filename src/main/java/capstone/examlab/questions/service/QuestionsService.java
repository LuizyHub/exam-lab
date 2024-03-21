package capstone.examlab.questions.service;

import capstone.examlab.questions.dto.QuestionsList;
import capstone.examlab.questions.dto.QuestionsOption;
import capstone.examlab.questions.dto.ImageSaveDto;
import java.util.List;


public interface QuestionsService {
    QuestionsList findByDriverLicenseQuestions(Long examId, QuestionsOption questionsOption);

    List<String> saveImages(ImageSaveDto imageSaveDto);

    void deleteImages(String imageName);
}
