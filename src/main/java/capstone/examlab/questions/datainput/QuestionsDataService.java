package capstone.examlab.questions.datainput;

import capstone.examlab.questions.entity.QuestionEntity;

import java.util.List;

public interface QuestionsDataService {
    void saveQuestions(List<QuestionEntity> questionEntities);
}
