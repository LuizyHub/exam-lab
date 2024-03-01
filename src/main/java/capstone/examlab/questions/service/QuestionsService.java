package capstone.examlab.questions.service;

import capstone.examlab.exams.dto.QuestionsList;
import capstone.examlab.exams.dto.QuestionsOption;


public interface QuestionsService {
    QuestionsList findByDriverLicenseQuestions(QuestionsOption questionsOption);
}
