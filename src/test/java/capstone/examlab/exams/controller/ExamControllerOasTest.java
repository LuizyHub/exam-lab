package capstone.examlab.exams.controller;

import capstone.examlab.RestDocsOpenApiSpecTest;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.epages.restdocs.apispec.SimpleType;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import jakarta.validation.OverridesAttribute;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Attributes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@Transactional
@Tag("openapi_test")
class ExamControllerOasTest extends RestDocsOpenApiSpecTest {

    private final Long existExamId = 1L;
    private final Long notExamId = 0L;
    private final String userId = "lab1@gmail.com";
    private final String userPw = "lab111!";

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    public void beforeTest() {

    }

    @Test
    void addExams() throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("exam_title", "소웨공");
        Map<String, List<String>> type = new HashMap<>();
        type.put("단원", List.of("1", "2", "3"));
        type.put("난이도", List.of("상", "중", "하"));
        map.put("types", type);
        this.mockMvc.perform(
                        post("/api/v1/exams")
                                .content(objectMapper.writeValueAsString(map))
                                .contentType("application/json")
                                .session(doLogin())
                )
                .andExpect(status().isOk())
                .andDo(document("add-exams",
                        resource(ResourceSnippetParameters.builder()
                                .description("회원만이 시험을 추가할 수 있습니다.")
                                .tag("exams")
                                .summary("Add exams")
                                .requestSchema(Schema.schema("ExamAdd"))
                                .build()
                        )
                ));
    }

    @Test
    void deleteExams() throws Exception {
        this.mockMvc.perform(
                        delete("/api/v1/exams/{examId}", addExamsAndGetId())
                                .session(doLogin())
                )
                .andExpect(status().isOk())
                .andDo(document("delete-exams",
                        resource(ResourceSnippetParameters.builder()
                                .description("본인의 시험만 삭제할 수 있습니다")
                                .tag("exams")
                                .summary("delete exams")
                                .build()
                        )
                ));
    }

    @Test
    void patchExam() throws Exception {
        Map<String, Object> map = new HashMap<>();
        Map<String, List<String>> type = new HashMap<>();
        type.put("단원", List.of("1", "2", "3", "4", "5"));
        type.put("난이도", List.of("상", "중", "하", "최하"));
        map.put("types", type);

        this.mockMvc.perform(
                        put("/api/v1/exams/{examId}", addExamsAndGetId())
                                .content(objectMapper.writeValueAsString(map))
                                .contentType("application/json")
                                .session(doLogin())
                )
                .andExpect(status().isOk())
                .andDo(document("patch-exams",
                        resource(ResourceSnippetParameters.builder()
                                .description("본인의 시험만 수정할 수 있습니다." +
                                        "시험 내용을 덮어쓰기 합니다.")
                                .tag("exams")
                                .summary("patch exams")
                                .pathParameters(
                                        parameterWithName("examId").description("Exam id").type(SimpleType.INTEGER)
                                )
                                .build()
                        )
                ));
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
                                        fieldWithPath("exams").description("List of exams").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("exams").type(JsonFieldType.ARRAY)
                                                .description("Exam")
                                                .attributes(Attributes.key("exam_title").value(String.class),
                                                        Attributes.key("exam_id").value(Long.class)),
                                        fieldWithPath("exams[].exam_title").description("Exam title").type(JsonFieldType.STRING),
                                        fieldWithPath("exams[].exam_id").description("Exam id").type(JsonFieldType.NUMBER)
                                )
                                .responseSchema(Schema.schema("ExamList"))
                                .build()
                        )
                ));
    }

    @Test
    void testGetExamType() throws Exception {

        this.mockMvc.perform(get("/api/v1/exams/{examId}", existExamId)
                        .session(doLogin()))
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
                                        fieldWithPath("category").description("List of tags").type(JsonFieldType.ARRAY)
                                )
                                .responseSchema(Schema.schema("ExamType"))
                                .build()
                        )
                ));
    }

    @Test
    void testGetNotExamType() throws Exception {

        this.mockMvc.perform(get("/api/v1/exams/{examId}", notExamId))
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

    MockHttpSession doLogin() throws Exception {
        Map<String, String> request = new HashMap<>() {{
            put("user_id", userId);
            put("password", userPw);
        }};
        return (MockHttpSession) mockMvc.perform(post("/api/v1/users/login")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn().getRequest().getSession();
    }

    Long addExamsAndGetId() throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("exam_title", "소웨공");
        Map<String, List<String>> type = new HashMap<>();
        type.put("단원", List.of("1", "2", "3"));
        type.put("난이도", List.of("상", "중", "하"));
        map.put("types", type);
        return Long.parseLong(this.mockMvc.perform(
                        post("/api/v1/exams")
                                .content(objectMapper.writeValueAsString(map))
                                .contentType("application/json")
                                .session(doLogin())
                )
                .andReturn().getResponse().getContentAsString());
    }
}
