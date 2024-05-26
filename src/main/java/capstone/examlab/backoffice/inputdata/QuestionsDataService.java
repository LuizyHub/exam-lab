package capstone.examlab.backoffice.inputdata;

import capstone.examlab.questions.documnet.Question;

import java.util.List;

public interface QuestionsDataService {
    void saveQuestions(List<Question> questionEntities);

    void deleteQuestion(Long examId);
}
