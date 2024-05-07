package capstone.examlab.exams.controller;

import capstone.examlab.RestDocsOpenApiSpecTest;
import capstone.examlab.ai.AiService;
import capstone.examlab.ai.dto.Question;
import capstone.examlab.ai.dto.Questions;
import capstone.examlab.exams.domain.Exam;
import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.questions.dto.QuestionDto;
import capstone.examlab.questions.dto.QuestionsListDto;
import capstone.examlab.questions.dto.image.ImageDto;
import capstone.examlab.questions.service.QuestionsService;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.epages.restdocs.apispec.SimpleType;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.headers.HeaderDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Attributes;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.util.PatternMatchUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
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

    @Autowired
    ExamRepository examRepository;

    @Autowired
    ObjectProvider<Exam> examProvider;

    @MockBean
    AiService aiService;

    @MockBean
    QuestionsService questionsService;

    @BeforeEach
    public void beforeTest() {

    }

    @Test
    void addExams() throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("exam_title", "소웨공");
        Map<String, List<String>> tags = new HashMap<>();
        tags.put("단원", List.of("1", "2", "3"));
        tags.put("난이도", List.of("상", "중", "하"));
        map.put("tags", tags);
        this.mockMvc.perform(
                        post("/api/v1/exams")
                                .content(objectMapper.writeValueAsString(map))
                                .contentType("application/json")
                                .session(doLogin())
                )
                .andExpect(status().isCreated())
                .andDo(document("add-exams",
                        resource(ResourceSnippetParameters.builder()
                                .description("회원만이 시험을 추가할 수 있습니다." +
                                        "응답 message로 생성된 시험지 ID를 반환합니다.")
                                .tag("exams")
                                .summary("Add exams")
                                .requestFields(
                                        fieldWithPath("exam_title").description("시험지 이름"),
                                        fieldWithPath("tags").description("tag 정보들"),
                                        subsectionWithPath("tags").type(JsonFieldType.OBJECT)
                                                .description("tag 정보들")
                                )
                                .responseFields(
                                        fieldWithPath("code").description("응답 코드").type(JsonFieldType.NUMBER),
                                        fieldWithPath("message").description("생성된 시험지 ID").type(JsonFieldType.STRING)
                                )
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
    void putExam() throws Exception {
        Map<String, Object> map = new HashMap<>();
        Map<String, List<String>> tags = new HashMap<>();
        tags.put("단원", List.of("1", "2", "3", "4", "5"));
        tags.put("난이도", List.of("상", "중", "하", "최하"));
        map.put("tags", tags);
        map.put("exam_title", "소프트웨어공학");

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
                        get("/api/v1/exams?sample=true")
                )
                .andExpect(status().isOk())
                .andDo(document("exams",
                        resource(ResourceSnippetParameters.builder()
                                .description("Get all exams")
                                .tag("exams")
                                .summary("Get all exams")
                                .queryParameters(
                                        parameterWithName("sample").description("true일 경우 sample 시험도 포함 default는 false").optional().type(SimpleType.BOOLEAN)
                                )
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

    @Test
    void testGetExamFile() throws Exception {
        this.mockMvc.perform(get("/api/v1/exams/{examId}/file", addExamsAndSetFileAndGetId())
                        .session(doLogin()))
                .andExpect(status().isOk())
                .andDo(document("exam-file",
                        resource(ResourceSnippetParameters.builder()
                                .description("## Get exam file \n" +
                                        "## 조건 \n" +
                                        "- 본인의 시험만 파일 조회 가능합니다.\n" +
                                        "- 파일이 없을 경우 파일 존재 여부를 false로 반환합니다.")
                                .tag("exams")
                                .summary("Get exam file")
                                .pathParameters(
                                        parameterWithName("examId").description("Exam id").type(SimpleType.INTEGER)
                                )
                                .responseFields(
                                        fieldWithPath("code").description("응답 코드").type(JsonFieldType.NUMBER),
                                        fieldWithPath("message.exist").description("파일 존재 여부").type(JsonFieldType.BOOLEAN),
                                        fieldWithPath("message.file_title").description("File title").type(JsonFieldType.STRING)
                                )
                                .responseSchema(Schema.schema("ExamFile"))
                                .build()
                        )
                ));
    }

    @Test
    void testDeleteExamFile() throws Exception {
        doNothing().when(questionsService).deleteQuestionsByExamId(anyLong());
        this.mockMvc.perform(delete("/api/v1/exams/{examId}/file", addExamsAndSetFileAndGetId())
                        .session(doLogin()))
                .andExpect(status().isOk())
                .andDo(document("delete-exam-file",
                        resource(ResourceSnippetParameters.builder()
                                .description("## Delete exam file\n" +
                                        "조건 : 본인의 시험만 파일 삭제 가능합니다")
                                .tag("exams")
                                .summary("Delete exam file")
                                .pathParameters(
                                        parameterWithName("examId").description("Exam id").type(SimpleType.INTEGER)
                                )
                                .build()
                        )
                ));
    }

    @Test
    void testAiQuestions() throws Exception {
        Questions questions = new Questions();
        ArrayList<Question> questionsList= new ArrayList<>();
        questionsList.add(Question.builder()
                        .question("문제1")
                        .answers(List.of(1))
                        .commentary("해설1")
                        .options(List.of("보기1", "보기2", "보기3", "보기4"))
                        .build());
        questions.setQuestions(questionsList);

        when(aiService.generateQuestions(anyString())).thenReturn(questions);

        ArrayList<QuestionDto> questionDtos = new ArrayList<>();
        questionDtos.add(QuestionDto.builder()
                .question("문제1")
                .answers(List.of(1))
                .commentary("해설1")
                .options(List.of("보기1", "보기2", "보기3", "보기4"))
                .build());

        QuestionsListDto questionsListDto = new QuestionsListDto(questionDtos);

        when(questionsService.addAIQuestionsByExamId(anyLong(), anyList())).thenReturn(questionsListDto);

        this.mockMvc.perform(post("/api/v1/exams/{examId}/ai", addExamsAndSetFileAndGetId())
                        .session(doLogin()))
                .andExpect(status().isOk())
                .andDo(document("ai-questions",
                        resource(ResourceSnippetParameters.builder()
                                .description("## 조건 \n" +
                                        "- 로그인 되어있어야합니다\n" +
                                        "- 본인으 시험이여야합니다\n" +
                                        "- 시험 자료 파일이 있어야합니다")
                                .tag("exams")
                                .summary("Get ai questions")
                                .pathParameters(
                                        parameterWithName("examId").description("Exam id").type(SimpleType.INTEGER)
                                )
                                .responseSchema(Schema.schema("AiQuestions"))
                                .build()
                        )
                ));
    }

    @Test
    void testPostFile() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "강의자료.txt", "text/plain", "강의자료 내용입니다. 이 내용을 토대로 문제를 만들어야합니다.".getBytes());
        //존재하지않는 RequestBuilder를 생성하기 위한 과정
        MockMultipartHttpServletRequestBuilder customRestDocumentationRequestBuilder =
                RestDocumentationRequestBuilders.multipart("/api/v1/exams/{examId}/file", addExamsAndGetId());

        //RestDocumentationRequestBuilders.multipart(post,"/api/v1/exams/{examId}/questions", 1L)의 역할 수행
        customRestDocumentationRequestBuilder.with(new RequestPostProcessor() {
            @Override
            public MockHttpServletRequest postProcessRequest(MockHttpServletRequest request) {
                request.setMethod("POST");
                return request;
            }
        });

        this.mockMvc.perform(
                        customRestDocumentationRequestBuilder
                                .file(file)
                                .session(doLogin())
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isOk())
                .andDo(document("post-file",
                        resource(ResourceSnippetParameters.builder()
                                .description("## 강의자료 추가  " +
                                        "Form-data로 파일을 전송합니다.\n" +
                                        "### 조건 \n" +
                                        "- 본인의 시험만 파일 추가 가능합니다.\n" +
                                        "- 파일이 이미 존재하면 안됩니다.")
                                .tag("exams")
                                .summary("Add file")
                                .pathParameters(
                                        parameterWithName("examId").description("Exam id").type(SimpleType.INTEGER)
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
        Map<String, List<String>> tags = new HashMap<>();
        tags.put("단원", List.of("1", "2", "3"));
        tags.put("난이도", List.of("상", "중", "하"));
        map.put("tags", tags);
        String data = this.mockMvc.perform(
                        post("/api/v1/exams")
                                .content(objectMapper.writeValueAsString(map))
                                .contentType("application/json")
                                .session(doLogin())
                )
                .andReturn().getResponse().getContentAsString();
        HashMap<String, Object> content = objectMapper.readValue(data, HashMap.class);

        return Long.parseLong(content.get("message").toString());
    }

    Long addExamsAndSetFileAndGetId() throws Exception {
        Long examId = addExamsAndGetId();

        Exam exam = (Exam) examRepository.findByExamId(examId).get();

        String fileTitle = "강의자료.txt";
        String fileText = "강의자료 내용입니다.";

        exam.setFile(fileTitle, fileText);
        examRepository.save(exam);

        return examId;
    }
}
