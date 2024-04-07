package capstone.examlab.questions.controller;


import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.questions.repository.QuestionsRepository;
import capstone.examlab.questions.service.QuestionsService;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

@SpringBootTest
public class QuestionsControllerTest {
    /*
    @MockBean
    private QuestionsService questionsService;

    @MockBean
    private ExamRepository examRepository;

    @MockBean
    private QuestionsRepository questionsRepository;

    private final Long existExamId = 1L;

    private final List<String> existTags = List.of("상황", "법");

    @BeforeEach
    public void beforeTest() {
        when(examRepository.existsById(existExamId)).thenReturn(true);
        when(questionsService.findByDriverLicenseQuestions(any(), any())).thenReturn(new QuestionsList());
        when(questionsRepository.existsByTags(existTags.get(0))).thenReturn(true);
        when(questionsRepository.existsByTags(existTags.get(1))).thenReturn(true);
    }

    @Test
    void validQuestionControllerTest() throws Exception {
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("tags", existTags.get(0))
                        .queryParam("tags", existTags.get(1))
                        .queryParam("count", String.valueOf(3))
                        .queryParam("includes", "고속도로"))
                .andExpect(status().isOk());
    }

    // 없는 문제 ID로 요청을 보내면 400 Bad Request를 반환하는지 테스트
    @Test
    void validExamIdTest() throws Exception {
        // When
        Long examId = 0L;

        //Then
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", examId))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId))
                .andExpect(status().isOk());
    }

    // 없는 태그로 요청을 보내면 400 Bad Request를 반환하는 테스트
    @Test
    void invalidTagsTest() throws Exception {
        // Then
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("tags", existTags.get(0))
                        .queryParam("tags", "없는태그"))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("tags", existTags.get(0))
                        .queryParam("tags", existTags.get(1)))
                .andExpect(status().isOk());
    }

    // 양수가 아닌 count로 요청을 보내면 400 Bad Request를 반환하는 테스트
    @Test
    void invalidCountTest() throws Exception {
        // Then
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("count", String.valueOf(-3)))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("count", String.valueOf(3)))
                .andExpect(status().isOk());
    }

    // 글자수 및 빈칸 적용된 유효하지않은 inlucds 요청시 400 Bad Request를 반환하는 테스트
    @Test
    void invalidIncludesTest() throws Exception {
        // Then
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("includes", "두 단어"))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("includes", "한"))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("includes", "한단어한글자이상"))
                .andExpect(status().isOk());
    }*/
}
