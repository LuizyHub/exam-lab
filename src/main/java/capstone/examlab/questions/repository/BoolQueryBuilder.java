package capstone.examlab.questions.repository;

import capstone.examlab.questions.dto.search.QuestionsSearch;
import co.elastic.clients.elasticsearch._types.query_dsl.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class BoolQueryBuilder {
    public Query searchQuestionsQuery(Long examId, QuestionsSearch questionsSearch) {
        // "must" 조건을 추가할 리스트 생성
        List<Query> mustQueries = new ArrayList<>();

        // "must" 조건(examId, tagsMap)에 해당하는 Term 쿼리들 추가
        mustQueries.add(new TermQuery.Builder().field("examId").value(examId).build()._toQuery());
        Map<String, List<String>> tagsMap = questionsSearch.getTags();
        if (tagsMap != null) {
            for (Map.Entry<String, List<String>> entry : tagsMap.entrySet()) {
                String key = "tagsMap."+entry.getKey();
                List<String> values = entry.getValue();

                // 각 tag 'key-value'에 대해 쿼리 생성
                for (String value : values) {
                    mustQueries.add(new TermQuery.Builder().field(key).value(value).build()._toQuery());
                }
            }
        }

        List<String> includes = questionsSearch.getIncludes();
        //검색어 포함 여부를 위한 MatchPhrasePrefix 쿼리 추가
        if(includes!=null){
            for (String include : includes) {
                mustQueries.add(new MatchPhrasePrefixQuery.Builder()
                        .field("question")
                        .query(include)
                        .build()._toQuery());
              }
        }

        BoolQuery.Builder boolQueryBuilder = new BoolQuery.Builder();
        // 생성했던 "must" 조건 설정
        boolQueryBuilder.must(mustQueries);

        return boolQueryBuilder.build()._toQuery();
    }
}