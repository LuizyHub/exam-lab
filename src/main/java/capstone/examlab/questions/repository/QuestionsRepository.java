package capstone.examlab.questions.repository;

import capstone.examlab.questions.documnet.Question;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import java.util.List;

public interface QuestionsRepository extends ElasticsearchRepository<Question, String> {

    List<Question> findByExamId(Long examId);

    void deleteByExamId(Long examId);
}
