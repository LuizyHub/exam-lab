package capstone.examlab.backoffice.inputdata;

import capstone.examlab.questions.documnet.Question;
import capstone.examlab.questions.repository.QuestionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionsDataServiceImpl implements QuestionsDataService{
    private final QuestionsRepository questionsRepository;
    @Override
    public void saveQuestions(List<Question> questionEntities) {
        questionsRepository.saveAll(questionEntities);
    }
}
