package capstone.examlab.exams.controller;

import capstone.examlab.RestDocsOpenApiSpecTest;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.epages.restdocs.apispec.SimpleType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.payload.JsonFieldType;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
                                        fieldWithPath("[].exam_id").description("Exam id").type(JsonFieldType.NUMBER)
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
