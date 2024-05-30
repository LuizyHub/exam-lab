package capstone.examlab.questions.controller;

import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.questions.dto.QuestionsList;
import capstone.examlab.questions.repository.DriverLicenseQuestionsRepository;
import capstone.examlab.questions.service.QuestionsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(QuestionsController.class)
class QuestionsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuestionsService questionsService;

    @MockBean
    private ExamRepository examRepository;

    @MockBean
    private DriverLicenseQuestionsRepository driverLicenseQuestionsRepository;

    private final Long existExamId = 1L;

    @BeforeEach
    public void beforeTest() {
        when(examRepository.existsById(existExamId)).thenReturn(true);
        when(questionsService.findByDriverLicenseQuestions(any(), any())).thenReturn(new QuestionsList());
        when(driverLicenseQuestionsRepository.existsByTags("상황")).thenReturn(true);
        when(driverLicenseQuestionsRepository.existsByTags("법")).thenReturn(true);
    }

    // 통과 예시
    @Test
    void validQuestionControllerTest() throws Exception {
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("tags", "상황")
                        .queryParam("tags", "법")
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
                        .queryParam("tags", "상황")
                        .queryParam("tags", "없는태그"))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("tags", "상황")
                        .queryParam("tags", "법"))
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
    }
}