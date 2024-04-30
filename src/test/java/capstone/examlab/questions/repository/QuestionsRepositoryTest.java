package capstone.examlab.questions.repository;

import capstone.examlab.questions.dto.image.ImageDto;
import capstone.examlab.questions.dto.QuestionDto;
import capstone.examlab.questions.dto.search.QuestionsSearchDto;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import org.junit.jupiter.api.Test;
import capstone.examlab.questions.entity.QuestionEntity;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.elasticsearch.DataElasticsearchTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;

import org.testcontainers.elasticsearch.ElasticsearchContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;

@DataElasticsearchTest
@Tag("db_test")
@Testcontainers
public class QuestionsRepositoryTest {
    // 8.x SSL HTTPS ERROR -> 7.x HTTP
    private final static String IMAGE_NAME = "docker.elastic.co/elasticsearch/elasticsearch:7.17.5";
    //private final static String IMAGE_NAME = "docker.elastic.co/elasticsearch/elasticsearch:8.11.3";

    @Container
    @ServiceConnection
    public static ElasticsearchContainer ES_CONTAINER = new ElasticsearchContainer(IMAGE_NAME);

    @Autowired
    private QuestionsRepository questionsRepository;

    @MockBean
    private BoolQueryBuilder boolQueryBuilder;

    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;

    private final Long existExamId = 0L;

    private final String questionUuid = "f8bd102d-c20a-4385-94f1-a4078843bg28";

    @BeforeEach
    public void setup() {
        await()
                .untilAsserted(() -> {
                    assertThat(ES_CONTAINER.isRunning()).isTrue();
                });
        QuestionEntity question = QuestionEntity.builder()
                .id(questionUuid)
                .examId(existExamId)
                .type("객관식")
                .question("다음 중 총중량 1.5톤 피견인 승용자동차를 4.5톤 화물자동차로 견인하는 경우 필요한 운전면허에 해당하지 않은 것은?")
                .options(List.of(
                        "① 제1종 대형면허 및 소형견인차면허",
                        "② 제1종 보통면허 및 대형견인차면허",
                        "③ 제1종 보통면허 및 소형견인차면허",
                        "④ 제2종 보통면허 및 대형견인차면허"))
                .questionImagesIn(List.of(
                        ImageDto.builder().url("url1").description("설명1").attribute("속성1").build()))
                .questionImagesOut(List.of(
                        ImageDto.builder().url("url2").description("설명2").attribute("속성2").build()))
                .answers(List.of(4))
                .commentary("도로교통법 시행규칙 별표18 총중량 750킬로그램을 초과하는 3톤 이하의 피견인 자동차를 견인하기 위해서는 견인 하는 자동차를 운전할 수 있는 면허와 소형견인차면허 또는 대형견인차면허를 가지고 있어야 한다.")
                .commentaryImagesIn(List.of(
                        ImageDto.builder().url("url3").description("설명3").attribute("속성3").build()))
                .commentaryImagesOut(List.of(
                        ImageDto.builder().url("url4").description("설명4").attribute("속성4").build()))
                .tagsMap(Map.of("category", List.of("화물")))
                .build();

        questionsRepository.save(question);
    }

    @Test
    void testSearchFromQuestions() {
        QuestionsSearchDto questionsSearchDto = QuestionsSearchDto.builder()
                .tags(Map.of("category", List.of("화물")))
                .includes(List.of("화물자동차"))
                .count(1)
                .build();

        Query query = boolQueryBuilder.searchQuestionsQuery(existExamId, questionsSearchDto);

        NativeQuery searchQuery = new NativeQuery(query);
        searchQuery.setPageable(PageRequest.of(0, questionsSearchDto.getCount()));
        SearchHits<QuestionEntity> searchHits = elasticsearchTemplate.search(searchQuery, QuestionEntity.class);

        List<QuestionDto> questionsList = new ArrayList<>();
        int count = 0;
        for (SearchHit<QuestionEntity> hit : searchHits) {
            if (count >= questionsSearchDto.getCount()) {
                break;
            }
            QuestionEntity entity = hit.getContent();
            QuestionDto questionDto = QuestionDto.builder()
                    .id(entity.getId())
                    .type(entity.getType())
                    .question(entity.getQuestion())
                    .questionImagesIn(new ArrayList<>(entity.getQuestionImagesIn()))
                    .questionImagesOut(new ArrayList<>(entity.getQuestionImagesOut()))
                    .options(new ArrayList<>(entity.getOptions()))
                    .answers(new ArrayList<>(entity.getAnswers()))
                    .commentary(entity.getCommentary())
                    .commentaryImagesIn(new ArrayList<>(entity.getCommentaryImagesIn()))
                    .commentaryImagesOut(new ArrayList<>(entity.getCommentaryImagesOut()))
                    .tags(new HashMap<>(entity.getTagsMap()))
                    .build();
            questionsList.add(questionDto);
            count++;
        }

        assertThat(questionsList).isNotNull();
        for (QuestionDto questionDto : questionsList) {
            System.out.println(questionDto.toString());
            assertThat(questionDto.getQuestion()).contains("화물자동차");
            assertThat(questionDto.getTags()).containsEntry("category", Collections.singletonList("화물"));
        }
    }

    @Test
    void testUpdateQuestionsByQuestionId() {
        QuestionUpdateDto questionUpdateDto = QuestionUpdateDto.builder()
                .id(questionUuid)
                .question("변경된 질문입니다.")
                .options(List.of("변경된 보기1", "변경된 보기2", "변경된 보기3", "변경된 보기4"))
                .answers(List.of(1, 3))
                .commentary("변경된 설명입니다.")
                .tags(Map.of("category", List.of("법"), "년도", List.of("20년")))
                .build();

        Optional<QuestionEntity> optionalQuestion = questionsRepository.findById(questionUuid);
        if (optionalQuestion.isPresent()) {
            QuestionEntity question = optionalQuestion.get();
            question.setQuestion(questionUpdateDto.getQuestion());
            question.setOptions(questionUpdateDto.getOptions());
            question.setAnswers(questionUpdateDto.getAnswers());
            question.setCommentary(questionUpdateDto.getCommentary());
            question.setTagsMap(questionUpdateDto.getTags());
            questionsRepository.save(question);
        } else {
            throw new AssertionError("질문이 존재 하지않음");
        }

        Optional<QuestionEntity> questionDto = questionsRepository.findById(questionUuid);
        questionDto.ifPresent(questionEntity -> {
            assertThat(questionEntity.getQuestion()).contains("변경된");
            assertThat(questionEntity.getTagsMap()).containsEntry("category", Collections.singletonList("법"));
            assertThat(questionEntity.getTagsMap()).containsEntry("년도", Collections.singletonList("20년"));
        });
    }

    @Test
    void testDeleteQuestionsByExamId() {
        assertThat(questionsRepository.findByExamId(existExamId).isEmpty()).isFalse();
        questionsRepository.deleteByExamId(existExamId);
        assertThat(questionsRepository.findByExamId(existExamId).isEmpty()).isTrue();
    }

    @Test
    void testDeleteQuestionsByQuestionId() {
        assertThat(questionsRepository.existsById(questionUuid)).isTrue();
        questionsRepository.deleteById(questionUuid);
        assertThat(questionsRepository.existsById(questionUuid)).isFalse();
    }
}
