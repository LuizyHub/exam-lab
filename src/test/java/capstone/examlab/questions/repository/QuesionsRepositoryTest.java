package capstone.examlab.questions.repository;

import capstone.examlab.questions.service.QuestionsServiceImpl;

import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.junit.jupiter.api.Test;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.util.Assert;
import org.testcontainers.elasticsearch.ElasticsearchContainer;
import org.testcontainers.utility.DockerImageName;

@SpringBootTest
@Tag("db_test")
public class QuesionsRepositoryTest {
    @MockBean
    private QuestionsServiceImpl questionsService;

    // 컨테이너를 생성 변수를 통해 beforAll, configuration에서 사용가능
    private static final ElasticsearchContainer container = new ElasticsearchContainer(
            DockerImageName.parse("docker.elastic.co/elasticsearch/elasticsearch:8.11.3"))
            .withPassword("elastic123")
            .withReuse(true);

    // 구성된 컨테이너 시작
    @BeforeAll
    static void setup() {
        container.start();
    }

    @Configuration
    static class TestConfiguration {

        @Bean
        public ClientConfiguration clientConfiguration() {
            Assert.notNull(container, "TestContainer is not initialized!");

            String elasticsearchUrl = "http://" + container.getHost() + ":" + container.getMappedPort(9200);
            // Elasticsearch 클라이언트 구성 생성
            ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                    .connectedTo(elasticsearchUrl)
                    .withBasicAuth("elastic", "elastic123")
                    .build();

            return clientConfiguration;
        }
    }

    @AfterAll
    static void tearDown() {
        //데이터 없애는 내용 추가해야할듯함

        container.stop();
    }

    @Test
    void testYourMethod() {

    }
}
