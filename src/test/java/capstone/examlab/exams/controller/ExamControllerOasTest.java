package capstone.examlab.exams.controller;

import capstone.examlab.RestDocsOpenApiSpecTest;
import capstone.examlab.exams.dto.*;
import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.exams.service.ExamsService;
import capstone.examlab.questions.dto.QuestionsList;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.epages.restdocs.apispec.SimpleType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;


import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//@WebMvcTest(ExamsController.class)
@SpringBootTest
@Tag("openapi_test")
class ExamControllerOasTest extends RestDocsOpenApiSpecTest {

    private final Long existExamId = 1L;
    private final Long notExamId = 0L;

    @BeforeEach
    public void beforeTest() {

    }

    @Test
    void getExams() throws Exception {
        this.mockMvc.perform(
                        get("/api/v1/exams")
                )
                .andExpect(status().isOk())
                .andDo(document("exams",
                        resource(ResourceSnippetParameters.builder()
                                .description("Get all exams")
                                .tag("exams")
                                .summary("Get all exams")
                                .responseFields(
                                        fieldWithPath("[]").description("List of exams").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("[].exam_title").description("Exam title").type(JsonFieldType.STRING),
                                        fieldWithPath("[].sub_exams").description("List of sub exams"),
                                        fieldWithPath("[].sub_exams[].exam_id").description("Sub exam id").type(JsonFieldType.NUMBER),
                                        fieldWithPath("[].sub_exams[].sub_title").description("Sub exam title").type(JsonFieldType.STRING)
                                )
                                .responseSchema(Schema.schema("ExamList"))
                                .build()
                        )
                ));
    }

    @Test
    void testGetExamType() throws Exception {

        this.mockMvc.perform(get("/api/v1/exams/{examId}/type", existExamId))
                .andExpect(status().isOk())
                .andDo(document("exam-type",
                        resource(ResourceSnippetParameters.builder()
                                .description("Get exam type")
                                .tag("exams")
                                .summary("Get exam type")
                                .pathParameters(
                                        parameterWithName("examId").description("Exam id").type(SimpleType.INTEGER)
                                )
                                .responseFields(
                                        fieldWithPath("tags").description("List of tags").type(JsonFieldType.ARRAY)
                                )
                                .responseSchema(Schema.schema("ExamType"))
                                .build()
                        )
                ));
    }

    @Test
    void testGetNotExamType() throws Exception {

        this.mockMvc.perform(get("/api/v1/exams/{examId}/type", notExamId))
                .andExpect(status().isBadRequest())
                .andDo(document("non-exam-type",
                        resource(ResourceSnippetParameters.builder()
                                .description("Get non exam type")
                                .tag("exams")
                                .summary("Get non exam type")
                                .pathParameters(
                                        parameterWithName("examId").description("Non Exam id").type(SimpleType.INTEGER)
                                )
                                .build()
                        )
                ));
    }
}
