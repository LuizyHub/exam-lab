package capstone.examlab.exams.controller;

import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.exams.service.ExamsService;
import capstone.examlab.questions.service.QuestionsService;
import capstone.examlab.users.argumentresolver.LoginUserArgumentResolver;
import capstone.examlab.users.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Tag("basic_test")
class ExamsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ExamRepository examRepository;

    @Autowired
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
        when(examRepository.existsByExamId(examId)).thenReturn(false);

        mockMvc.perform(get("/api/v1/exams/{examId}", examId))
                .andExpect(status().isBadRequest());
    }
}