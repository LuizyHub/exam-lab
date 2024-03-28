package capstone.examlab.questions.datainput;

import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.repository.QuestionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionsDataServiceImpl implements QuestionsDataService{
    private final QuestionsRepository questionsRepository;
    @Override
    public void saveQuestions(List<QuestionEntity> questionEntities) {
        questionsRepository.saveAll(questionEntities);
    }
}
