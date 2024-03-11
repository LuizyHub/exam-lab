package capstone.examlab.questions.repository;

import capstone.examlab.questions.dto.Question;
import capstone.examlab.questions.dto.QuestionsList;
import capstone.examlab.questions.dto.QuestionsOption;
import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.repository.DriverLicenseQuestionsRepository;
import capstone.examlab.questions.service.QuestionsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
@Transactional
public class QuesionsRepositoryTest {

    @Autowired
    private QuestionsService questionsService;

    @Autowired
    private DriverLicenseQuestionsRepository driverLicenseQuestionsRepository;

    @Test
    @SuppressWarnings("unchecked")
    public void testDriverLicenseQuestionsRepository() throws Exception{
        QuestionEntity questionEntity = new QuestionEntity();

        Page<QuestionEntity> mockPage = mock(Page.class);
        when(mockPage.iterator()).thenReturn(List.of(questionEntity).iterator());

        //테스트할 DTO값 설정
        QuestionsOption questionsOption = QuestionsOption.builder()
                .tags(List.of("상황"))
                .count(3)
                .includes("고속도로")
                .build();

        QuestionsList questionsList = questionsService.findByDriverLicenseQuestions(1L, questionsOption);

        //결과 검증
        assertThat(questionsList).isNotNull();
        assertThat(questionsList.size() == 3);

        for (Question question : questionsList) {
            assertThat(question.getTags().contains("상황"));
            assertThat(question.getQuestion().contains("고속도로"));
        }

        //Tags = null일시 테스트
        questionsOption.setTags(null);
        questionsOption.setIncludes("표지판");
        questionsOption.setCount(5);

        questionsList = questionsService.findByDriverLicenseQuestions(1L, questionsOption);

        //결과 검증
        assertThat(questionsList).isNotNull();
        assertThat(questionsList.size() == 5);

        for (Question question : questionsList) {
            assertThat(question.getQuestion().contains("표지판"));
        }

        //count default값 테스트
        questionsOption.setTags(null);
        questionsOption.setIncludes(null);

        questionsList = questionsService.findByDriverLicenseQuestions(1L, questionsOption);

        //결과 검증
        assertThat(questionsList).isNotNull();
        assertThat(questionsList.size() == 10);
    }
}
