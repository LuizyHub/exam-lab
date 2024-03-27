package capstone.examlab.questions.repository;

import capstone.examlab.questions.entity.QuestionEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface questionsRepository extends ElasticsearchRepository<QuestionEntity, String> {

}
