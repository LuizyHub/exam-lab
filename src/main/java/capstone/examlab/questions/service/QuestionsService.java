package capstone.examlab.questions.service;

import capstone.examlab.questions.dto.QuestionsList;
import capstone.examlab.questions.dto.QuestionsOption;


public interface QuestionsService {
    QuestionsList findByDriverLicenseQuestions(Long examId, QuestionsOption questionsOption);
}
