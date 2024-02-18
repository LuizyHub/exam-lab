package capstone.examlab.exams.controller;

import capstone.examlab.exams.dto.*;
import capstone.examlab.exams.service.ExamsService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(ExamsController.class)
class ExamsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ExamsService examsService;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    private ExamList getExamListMock() {
        ExamList examList = new ExamList();

        ExamDetail examDetail1 = new ExamDetail();
        examDetail1.setTitle("운전면허");
        examDetail1.getSubExams().add(SubExamDetail.builder()
                .examId(1L)
                .subTitle("1종")
                .build());
        examDetail1.getSubExams().add(SubExamDetail.builder()
                .examId(2L)
                .subTitle("2종")
                .build());
        examList.add(examDetail1);

        ExamDetail examDetail2 = new ExamDetail();
        examDetail2.setTitle("수능");
        examDetail2.getSubExams().add(SubExamDetail.builder()
                .examId(3L)
                .subTitle("수학")
                .build());
        examDetail2.getSubExams().add(SubExamDetail.builder()
                .examId(4L)
                .subTitle("영어")
                .build());
        examList.add(examDetail2);

        return examList;
    }


    @Test
    void testGetExams() throws Exception {
        when(examsService.getExamList()).thenReturn(getExamListMock());

        mockMvc.perform(get("/exams"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isNotEmpty())
                .andDo(result -> System.out.println(result.getResponse().getContentAsString(StandardCharsets.UTF_8)))
                .andExpect(jsonPath("$[0].title").value("운전면허"))
                .andExpect(jsonPath("$[0].sub_exams[0].exam_id").value(1))
                .andExpect(jsonPath("$[0].sub_exams[0].sub_title").value("1종"))
                .andExpect(jsonPath("$[0].sub_exams[1].exam_id").value(2))
                .andExpect(jsonPath("$[0].sub_exams[1].sub_title").value("2종"))
                .andExpect(jsonPath("$[1].title").value("수능"))
                .andExpect(jsonPath("$[1].sub_exams[0].exam_id").value(3))
                .andExpect(jsonPath("$[1].sub_exams[0].sub_title").value("수학"))
                .andExpect(jsonPath("$[1].sub_exams[1].exam_id").value(4))
                .andExpect(jsonPath("$[1].sub_exams[1].sub_title").value("영어"));
    }

    private ExamType getExamTypeMock(Long id) {
        ExamType examType = new ExamType();

        List<String> tagList = new ArrayList<>();
        tagList.add("상황");
        tagList.add("표지");
        examType.put("tags", tagList);

        return examType;
    }

    @Test
    void testGetExamType() throws Exception {
        Long examId = 1L;
        when(examsService.getExamType(examId)).thenReturn(getExamTypeMock(examId));

        mockMvc.perform(get("/exams/{examId}/type", examId))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.tags").isArray())
                .andExpect(jsonPath("$.tags").isNotEmpty())
                .andExpect(jsonPath("$.tags[0]").value("상황"))
                .andExpect(jsonPath("$.tags[1]").value("표지"));
    }

    private QuestionsList getQuestionsListMock(QuestionsOption questionsOption) {
        QuestionsList questionsList = new QuestionsList();

        questionsList.add(Question.builder()
                .id(1L)
                .type("객관식")
                .question("1번 문제")
                .questionImageUrls(new ArrayList<String>() {{
                    add("1번 문제 이미지");
                }})
                .questionImageDescriptions(new ArrayList<String>() {{
                    add("1번 문제 이미지 설명");
                }})
                .options(new ArrayList<String>() {{
                    add("1번 답");
                    add("2번 답");
                    add("3번 답");
                    add("4번 답");
                }})
                .answers(new ArrayList<Integer>() {{
                    add(1);
                    add(3);
                }})
                .explanation("1번 문제 설명")
                .explanationImageUrls(new ArrayList<String>() {{
                    add("1번 문제 설명 이미지");
                }})
                .explanationImageDescriptions(new ArrayList<String>() {{
                    add("1번 문제 설명 이미지 설명");
                }})
                .tags(new ArrayList<String>() {{
                    add("표지");
                }})
                .build());

        questionsList.add(Question.builder()
                .id(2L)
                .type("객관식")
                .question("2번 문제")
                .questionImageUrls(new ArrayList<String>() {{
                    add("2번 문제 이미지");
                }})
                .questionImageDescriptions(new ArrayList<String>() {{
                    add("2번 문제 이미지 설명");
                }})
                .options(new ArrayList<String>() {{
                    add("1번 답");
                    add("2번 답");
                    add("3번 답");
                    add("4번 답");
                }})
                .answers(new ArrayList<Integer>() {{
                    add(2);
                    add(4);
                }})
                .explanation("2번 문제 설명")
                .explanationImageUrls(new ArrayList<String>() {{
                    add("2번 문제 설명 이미지");
                }})
                .explanationImageDescriptions(new ArrayList<String>() {{
                    add("2번 문제 설명 이미지 설명");
                }})
                .tags(new ArrayList<String>() {{
                    add("상황");
                }})
                .build());


        return questionsList;
    }

    @Test
    void testGetExamQuestions() throws Exception {
        QuestionsOption questionsOption = QuestionsOption.builder()
                .count(2)
                .tags(new ArrayList<String>() {{
                    add("상황");
                    add("표지");
                }})
                .includes(new ArrayList<String>() {{
                    add("고속도로");
                }})
                .build();

        when(examsService.getQuestionsList(questionsOption)).thenReturn(getQuestionsListMock(questionsOption));

        mockMvc.perform(get("/exams/1/questions")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                        .param("tags", "상황")
                        .param("tags", "표지")
                        .param("count", "2")
                        .param("includes", "고속도로")) // 예시 쿼리 파라미터)
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isNotEmpty())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].type").value("객관식"))
                .andExpect(jsonPath("$[0].question").value("1번 문제"))
                .andExpect(jsonPath("$[0].question_image_urls").isArray())
                .andExpect(jsonPath("$[0].question_image_urls").isNotEmpty())
                .andExpect(jsonPath("$[0].question_image_urls[0]").value("1번 문제 이미지"))
                .andExpect(jsonPath("$[0].question_image_descriptions").isArray())
                .andExpect(jsonPath("$[0].question_image_descriptions").isNotEmpty())
                .andExpect(jsonPath("$[0].question_image_descriptions[0]").value("1번 문제 이미지 설명"))
                .andExpect(jsonPath("$[0].options").isArray())
                .andExpect(jsonPath("$[0].options").isNotEmpty())
                .andExpect(jsonPath("$[0].options[0]").value("1번 답"))
                .andExpect(jsonPath("$[0].options[1]").value("2번 답"))
                .andExpect(jsonPath("$[0].options[2]").value("3번 답"))
                .andExpect(jsonPath("$[0].options[3]").value("4번 답"))
                .andExpect(jsonPath("$[0].answers").isArray())
                .andExpect(jsonPath("$[0].answers").isNotEmpty())
                .andExpect(jsonPath("$[0].answers[0]").value(1))
                .andExpect(jsonPath("$[0].answers[1]").value(3))
                .andExpect(jsonPath("$[0].explanation").value("1번 문제 설명"))
                .andExpect(jsonPath("$[0].explanation_image_urls").isArray())
                .andExpect(jsonPath("$[0].explanation_image_urls").isNotEmpty())
                .andExpect(jsonPath("$[0].explanation_image_urls[0]").value("1번 문제 설명 이미지"))
                .andExpect(jsonPath("$[0].explanation_image_descriptions").isArray())
                .andExpect(jsonPath("$[0].explanation_image_descriptions").isNotEmpty())
                .andExpect(jsonPath("$[0].explanation_image_descriptions[0]").value("1번 문제 설명 이미지 설명"))
                .andExpect(jsonPath("$[0].tags").isArray())
                .andExpect(jsonPath("$[0].tags").isNotEmpty())
                .andExpect(jsonPath("$[0].tags[0]").value("표지"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].type").value("객관식"))
                .andExpect(jsonPath("$[1].question").value("2번 문제"))
                .andExpect(jsonPath("$[1].question_image_urls").isArray())
                .andExpect(jsonPath("$[1].question_image_urls").isNotEmpty())
                .andExpect(jsonPath("$[1].question_image_urls[0]").value("2번 문제 이미지"))
                .andExpect(jsonPath("$[1].question_image_descriptions").isArray())
                .andExpect(jsonPath("$[1].question_image_descriptions").isNotEmpty())
                .andExpect(jsonPath("$[1].question_image_descriptions[0]").value("2번 문제 이미지 설명"))
                .andExpect(jsonPath("$[1].options").isArray())
                .andExpect(jsonPath("$[1].options").isNotEmpty())
                .andExpect(jsonPath("$[1].options[0]").value("1번 답"))
                .andExpect(jsonPath("$[1].options[1]").value("2번 답"))
                .andExpect(jsonPath("$[1].options[2]").value("3번 답"))
                .andExpect(jsonPath("$[1].options[3]").value("4번 답"))
                .andExpect(jsonPath("$[1].answers").isArray())
                .andExpect(jsonPath("$[1].answers").isNotEmpty())
                .andExpect(jsonPath("$[1].answers[0]").value(2))
                .andExpect(jsonPath("$[1].answers[1]").value(4))
                .andExpect(jsonPath("$[1].explanation").value("2번 문제 설명"))
                .andExpect(jsonPath("$[1].explanation_image_urls").isArray())
                .andExpect(jsonPath("$[1].explanation_image_urls").isNotEmpty())
                .andExpect(jsonPath("$[1].explanation_image_urls[0]").value("2번 문제 설명 이미지"))
                .andExpect(jsonPath("$[1].explanation_image_descriptions").isArray())
                .andExpect(jsonPath("$[1].explanation_image_descriptions").isNotEmpty())
                .andExpect(jsonPath("$[1].explanation_image_descriptions[0]").value("2번 문제 설명 이미지 설명"))
                .andExpect(jsonPath("$[1].tags").isArray())
                .andExpect(jsonPath("$[1].tags").isNotEmpty())
                .andExpect(jsonPath("$[1].tags[0]").value("상황"));
    }
}