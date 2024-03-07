package capstone.examlab.questions.controller;

import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.questions.service.QuestionsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
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


    // 없는 문제 ID로 요청을 보내면 400 Bad Request를 반환하는지 테스트
    @Test
    void validExamIdTest() throws Exception {
        //when
        Long examId = 0L;
        when(examRepository.existsById(examId)).thenReturn(false);

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", examId)
                        .queryParam("tags", "상황")
                        .queryParam("includes", "고속도로")
                        .queryParam("count", String.valueOf(10)))
                .andExpect(status().isBadRequest());
    }
}