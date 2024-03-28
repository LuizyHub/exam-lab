package capstone.examlab.exams.controller;

import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.exams.service.ExamsService;
import capstone.examlab.users.argumentresolver.LoginUserArgumentResolver;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ExamsController.class)
@Tag("basic_test")
class ExamsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ExamsService examsService;

    @MockBean
    private ExamRepository examRepository;

    @MockBean
    private LoginUserArgumentResolver loginUserArgumentResolver;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    // 없는 문제 ID로 요청을 보내면 400 Bad Request를 반환하는지 테스트
    @Test
    void validExamIdTest() throws Exception {
        //when
        Long examId = 0L;
        when(examRepository.existsById(examId)).thenReturn(false);

        mockMvc.perform(get("/api/v1/exams/{examId}/type", examId))
                .andExpect(status().isBadRequest());
    }
}