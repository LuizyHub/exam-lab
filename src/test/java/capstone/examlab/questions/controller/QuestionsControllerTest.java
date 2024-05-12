package capstone.examlab.questions.controller;


import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.exams.service.ExamsService;
import capstone.examlab.questions.dto.QuestionDto;
import capstone.examlab.questions.dto.QuestionsListDto;
import capstone.examlab.questions.dto.search.QuestionsSearchDto;
import capstone.examlab.questions.service.QuestionsService;
import capstone.examlab.users.argumentresolver.LoginUserArgumentResolver;
import capstone.examlab.users.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(QuestionsController.class)
@Tag("basic_test")
public class QuestionsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuestionsService questionsService;

    @MockBean
    private ExamsService examsService;

    @Autowired
    private LoginUserArgumentResolver loginUserArgumentResolver;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private ExamRepository examRepository;

    private final Long existExamId = 0L;
    private final List<String> existTags = List.of("상황", "법");

    @BeforeEach
    public void beforeTest() {
        when(examRepository.existsByExamId(existExamId)).thenReturn(true);
    }

    @Test
    void validQuestionControllerTest() throws Exception {
        List<QuestionDto> questions = Collections.emptyList();
        QuestionsListDto questionsListDto = new QuestionsListDto(questions);
        when(questionsService.searchFromQuestions(eq(existExamId), any(QuestionsSearchDto.class)))
                .thenReturn(questionsListDto);

        // 해당 되는 내용 없을시 404 에러
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("tags_category", existTags.get(0))
                        .queryParam("tags_category", existTags.get(1))
                        .queryParam("count", String.valueOf(3))
                        .queryParam("includes", "장농면허어디감"))
                .andExpect(status().isNotFound());

        // 정규식 검증에 걸린 경우 400에러
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("tags_!category", "상@@황")
                        .queryParam("tags_category", "법_법")
                        .queryParam("count", String.valueOf(3))
                        .queryParam("includes", "운전면허증"))
                .andExpect(status().isBadRequest());
    }
}
