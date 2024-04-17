package capstone.examlab.questions.repository;

import capstone.examlab.questions.dto.ImageDto;
import org.junit.jupiter.api.Test;
import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.service.QuestionsService;
import org.junit.jupiter.api.*;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.data.elasticsearch.DataElasticsearchTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.testcontainers.elasticsearch.ElasticsearchContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.shaded.org.awaitility.Awaitility;

import java.time.Duration;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@DataElasticsearchTest
@Tag("db_test")
@Testcontainers
public class QuestionsRepositoryTest {
    private final static String IMAGE_NAME = "docker.elastic.co/elasticsearch/elasticsearch:7.17.5";

    @Container
    @ServiceConnection
    public static ElasticsearchContainer ES_CONTAINER = new ElasticsearchContainer(IMAGE_NAME);

    @Autowired
    private QuestionsRepository questionsRepository;

    @MockBean
    private QuestionsService questionsService;

    @MockBean
    private BoolQueryBuilder boolQueryBuilder;

    private final Long existExamId = 1L;

    private final String questionUuid = "f8bd102d-c20a-4385-94f1-a4078843bg28";

    @BeforeEach
    public void setup() throws InterruptedException {
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
    void testDatabaseIsRunning() {
        assertThat(ES_CONTAINER.isRunning()).isTrue();
        Optional<QuestionEntity> savedQuestion = questionsRepository.findById(questionUuid);
        if (savedQuestion.isPresent()) {
            QuestionEntity retrievedQuestion = savedQuestion.get();
            System.out.println("retri questiosn: "+retrievedQuestion.getQuestion());
        } else {
            System.out.println("Question with UUID " + questionUuid + " not found.");
        }
    }


//    @Test
//    void testDatabaseIsRunning() {
//        assertThat(ES_CONTAINER.isRunning()).isTrue();
//        assertThat(ES_CONTAINER.isRunning()).isTrue();
//        // 페이지네이션 없이 모든 데이터를 조회하려면 PageRequest.of(0, Integer.MAX_VALUE)를 사용합니다.
//        Page<QuestionEntity> allQuestions = questionsRepository.findAll(PageRequest.of(0, Integer.MAX_VALUE));
//
//        // 조회된 데이터 확인
//        List<QuestionEntity> questionList = allQuestions.getContent();
//        System.out.println(allQuestions.getSize());
//        for (QuestionEntity question : questionList) {
//            System.out.println(question.toString());
//        }
//    }
}
