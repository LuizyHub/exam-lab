package capstone.examlab.questions.repository;

import capstone.examlab.questions.entity.QuestionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface questionsRepository extends ElasticsearchRepository<QuestionEntity, String> {
    //Tags O, Includes X
   // Page<QuestionEntity> findByTagsIn(List<String> tags, Pageable pageable);
    //Tags X, Inlcludes O
   // Page<QuestionEntity> findByQuestionContainingOrOptionsContaining(String QuestionInclude, String OptionInclude, Pageable pageable);
    //All O
    //Page<QuestionEntity> findByTagsInAndQuestionContainingOrOptionsContaining(List<String> tags, String QuestionInclude, String OptionInclude, Pageable pageable);

}
