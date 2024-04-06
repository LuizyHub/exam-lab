package capstone.examlab.questions.repository;

import capstone.examlab.questions.entity.QuestionEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import java.util.List;

public interface QuestionsRepository extends ElasticsearchRepository<QuestionEntity, String> {

    List<QuestionEntity> findByExamId(Long examId);

    void deleteByExamId(Long examId);
}
