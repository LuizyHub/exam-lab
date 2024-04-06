package capstone.examlab.questions.repository;

import capstone.examlab.ExamLabApplication;
import capstone.examlab.questions.dto.ImageDto;
import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.service.QuestionsService;

import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.*;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.testcontainers.elasticsearch.ElasticsearchContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.*;

@SpringBootTest
@Tag("db_test")
@Testcontainers
class QuestionsRepositoryTest {
 /*   @Container
    private static final ElasticsearchContainer container = new ElasticsearchContainer(
            DockerImageName.parse("docker.elastic.co/elasticsearch/elasticsearch:8.11.3"))
            .withPassword("elastic123")
            .withReuse(true);

    @Configuration
    static class TestConfiguration extends ElasticsearchConfiguration {
        @Override
        public @NotNull ClientConfiguration clientConfiguration() {

            return ClientConfiguration.builder()
                    .connectedTo(container.getHttpHostAddress())
                    .usingSsl(container.createSslContextFromCa())
                    .withBasicAuth("elastic", "elastic123")
                    .build();
        }
    }
    @Mock
    private QuestionsRepository questionsRepository;

    @MockBean
    private QuestionsService questionsService;

    @MockBean
    private BoolQueryBuilder boolQueryBuilder;

    @MockBean
    private ElasticsearchTemplate elasticsearchTemplate;

    @Test
    void testRepository() {
        ImageDto questionImagesOut = ImageDto.builder()
                .url("https://examlab-image.s3.ap-northeast-2.amazonaws.com/driver_images/870.png")
                .description("")
                .attribute("examlab-image-right")
                .build();

        Map<String, List<String>> tagsMap = new HashMap<>();
        tagsMap.put("category", List.of("법", "상황"));

        QuestionEntity question = QuestionEntity.builder()
                .id("4d51a532-3495-4fab-beef-27cc974c64b1")
                .examId(1L)
                .type("객관식")
                .question("예시 문제1: 도로교통법령상, 포함된 단어 찾기 문제?")
                .options(List.of(
                        "① 규제표지이다.",
                        "② 직진차량 우선표지이다.",
                        "③ 좌합류 도로표지이다.",
                        "④ 좌회전 금지표지이다."))
                .answers(List.of(3))
                .questionImagesOut(List.of(questionImagesOut))
                .commentary("commentary 예시1")
                .commentaryImagesIn(List.of())
                .commentaryImagesOut(List.of())
                .tagsMap(tagsMap)
                .build();

        questionsRepository.save(question);
        //questionsService.deleteQuestionsByQuestionId(question.getId());
        Optional<QuestionEntity> savedQuestion = questionsRepository.findById(question.getId());
        assertThat(savedQuestion).isPresent();
    }*/



//
//    @BeforeEach
//    void addTestData() {
//        List<QuestionEntity>questionEntities = new ArrayList<>();
//        // 예시 1 생성
//        ImageDto questionImagesOut = ImageDto.builder()
//                .url("https://examlab-image.s3.ap-northeast-2.amazonaws.com/driver_images/870.png")
//                .description("")
//                .attribute("examlab-image-right")
//                .build();
//
//        Map<String, List<String>> tagsMap = new HashMap<>();
//        tagsMap.put("category", List.of("법", "상황"));
//
//        QuestionEntity question1 = QuestionEntity.builder()
//                .id("4d51a532-3495-4fab-beef-27cc974c64b1")
//                .examId(1L)
//                .type("객관식")
//                .question("예시 문제1: 도로교통법령상, 포함된 단어 찾기 문제?")
//                .options(List.of(
//                        "① 규제표지이다.",
//                        "② 직진차량 우선표지이다.",
//                        "③ 좌합류 도로표지이다.",
//                        "④ 좌회전 금지표지이다."))
//                .answers(List.of(3))
//                .questionImagesOut(List.of(questionImagesOut))
//                .commentary("commentary 예시1")
//                .commentaryImagesIn(List.of())
//                .commentaryImagesOut(List.of())
//                .tagsMap(tagsMap)
//                .build();
//        questionEntities.add(question1);
//        // 예시 2 생성
//        ImageDto questionImagesOut2 = ImageDto.builder()
//                .url("https://examlab-image.s3.ap-northeast-2.amazonaws.com/driver_images/872.png")
//                .description("")
//                .attribute("examlab-image-right")
//                .build();
//
//        Map<String, List<String>> tagsMap2 = new HashMap<>();
//        tagsMap2.put("category", List.of("법", "화물"));
//        tagsMap2.put("year", List.of("20년도"));
//
//        QuestionEntity question2 = QuestionEntity.builder()
//                .id("55cb3411-4b1d-4320-a46d-b8d36bb6b808")
//                .examId(1L)
//                .type("객관식")
//                .question("예시 문제2 examLab화이팅 이 단어 포함되면 찾을 수 있는 로직은?")
//                .options(List.of(
//                        "① 보기1",
//                        "② 보기2",
//                        "③ 보기3",
//                        "④ 보기4"))
//                .answers(List.of(1))
//                .questionImagesOut(List.of(questionImagesOut2))
//                .commentary("commentary 예시2")
//                .commentaryImagesIn(List.of())
//                .commentaryImagesOut(List.of())
//                .tagsMap(tagsMap2)
//                .build();
//        questionEntities.add(question2);
//        questionsRepository.saveAll(questionEntities);
//        System.out.println("Data size: " + questionsRepository.findByExamId(1L).size());
//        assertThat(questionsRepository.findByExamId(1L).size()).isEqualTo(2);
//    }
//
//    @Test
//    void hi(){
//
//    }
/*    @Test
    void deleteQuestionsByExamId(){
      //  assertThat(questionsRepository.findByExamId(1L).size()).isEqualTo(2);
        boolean deleted = questionsService.deleteQuestionsByExamId(1L);
        assertThat(deleted).isEqualTo(true);
        assertThat(questionsRepository.findByExamId(1L).size()).isEqualTo(0);
    }*/

//    @Test
//    void searchFromQuestionsTest() {
//        Map<String, List<String>> tagsMap = new HashMap<>();
//        tagsMap.put("category", List.of("법"));
//        //tagsMap.put("year", List.of("20년도"));
//
//        List<String> includes = List.of("Lab화이팅");
//
//        assertThat(questionsRepository.findByExamId(1L).size()==2);
//
//        QuestionsSearch questionsSearch = QuestionsSearch.builder()
//                .tagsMap(new HashMap<String, List<String>>())
//                .includes(new ArrayList<>())
//                .build();
//
//        QuestionsList questionsList = questionsService.searchFromQuestions(1L, questionsSearch);
//
//
//        for (Question question : questionsList) {
//            //assertThat(question.getTagsMap().get("category").contains("법"));
//            //assertThat(question.getTagsMap().get("year").contains("20년도"));
//            for (String include : includes) {
//                assertThat(question.getQuestion().contains(include));
//            }
//        }
//    }
}
