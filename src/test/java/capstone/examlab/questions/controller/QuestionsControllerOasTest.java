package capstone.examlab.questions.controller;

import capstone.examlab.RestDocsOpenApiSpecTest;
import capstone.examlab.questions.dto.ImageDto;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.SimpleType;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.headers.HeaderDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@Tag("openapi_test")
class QuestionsControllerOasTest extends RestDocsOpenApiSpecTest {
    private final Long existExamId = 1L;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    public void beforeTest() {

    }

    @Test
    void addQuestions() throws Exception {
        Map<String, Object> questionUploadInfo = new HashMap<>();
        questionUploadInfo.put("type", "객관식");
        questionUploadInfo.put("question", "다음 중 총중량 1.5톤 피견인 승용자동차를 4.5톤 화물자동차로 견인하는 경우 필요한 운전면허에 해당하지 않은 것은?");
        questionUploadInfo.put("options", List.of("① 제1종 대형면허 및 소형견인차면허", "② 제1종 보통면허 및 대형견인차면허", "③ 제1종 보통면허 및 소형견인차면허", "④ 제2종 보통면허 및 대형견인차면허"));

        List<ImageDto> questionImagesTextIn = new ArrayList<>();
        ImageDto imageDto1 = ImageDto.builder()
                .url("url1")
                .description("설명1")
                .attribute("속성1")
                .build();
        questionImagesTextIn.add(imageDto1);
        questionUploadInfo.put("questionImagesTextIn", questionImagesTextIn);

        List<ImageDto> questionImagesTextOut = new ArrayList<>();
        ImageDto imageDto2 = ImageDto.builder()
                .url("url2")
                .description("설명2")
                .attribute("속성2")
                .build();
        questionImagesTextOut.add(imageDto2);
        questionUploadInfo.put("questionImagesTextOut", questionImagesTextOut);

        questionUploadInfo.put("answers", List.of("4"));
        Map<String, List<String>> tag = new HashMap<>();
        tag.put("category", List.of("화물"));
        questionUploadInfo.put("tag", tag);
        questionUploadInfo.put("commentary", "도로교통법 시행규칙 별표18 총중량 750킬로그램을 초과하는 3톤 이하의 피견인 자동차를 견인하기 위해서는 견인 하는 자동차를 운전할 수 있는 면허와 소형견인차면허 또는 대형견인차면허를 가지고 있어야 한다.");

        List<ImageDto> commentaryImagesTextIn = new ArrayList<>();
        ImageDto imageDto3 = ImageDto.builder()
                .url("url3")
                .description("설명3")
                .attribute("속성3")
                .build();
        commentaryImagesTextIn.add(imageDto3);
        questionUploadInfo.put("commentaryImagesTextIn", commentaryImagesTextIn);

        List<ImageDto> commentaryImagesTextOut = new ArrayList<>();
        ImageDto imageDto4 = ImageDto.builder()
                .url("url4")
                .description("설명4")
                .attribute("속성4")
                .build();
        commentaryImagesTextOut.add(imageDto4);
        questionUploadInfo.put("commentaryImagesTextOut", commentaryImagesTextOut);

        //Json 형식의 questionUploadInfo를 문자열로 변환
        String questionUploadInfoJson = objectMapper.writeValueAsString(questionUploadInfo);

        MockMultipartFile jsonPart = new MockMultipartFile(
                "questionUploadInfo",                  // 파트 이름
                "questionUploadInfo.json",             // 파일 이름
                MediaType.APPLICATION_JSON_VALUE,     // 파일 타입
                questionUploadInfoJson.getBytes()      // 파일 내용
        );

        System.out.println("QuestionUploadInfo: " + objectMapper.writeValueAsString(questionUploadInfo));
        MockMultipartFile questionImagesIn = new MockMultipartFile("questionImagesIn", "image1.png", "image/png", "image1".getBytes());
        MockMultipartFile questionImagesOut = new MockMultipartFile("questionImagesOut", "image2.png", "image/png", "image2".getBytes());
        MockMultipartFile commentaryImagesIn = new MockMultipartFile("commentaryImagesIn", "image3.png", "image/png", "image3".getBytes());
        MockMultipartFile commentaryImagesOut = new MockMultipartFile("commentaryImagesOut", "image4.png", "image/png", "image4".getBytes());

        //존재하지않는 RequestBuilder를 생성하기 위한 과정
        MockMultipartHttpServletRequestBuilder customRestDocumentationRequestBuilder =
                RestDocumentationRequestBuilders.multipart("/api/v1/exams/{examId}/questions", existExamId);

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
                                .file(jsonPart)
                                .file(questionImagesIn)
                                .file(questionImagesOut)
                                .file(commentaryImagesIn)
                                .file(commentaryImagesOut)
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isCreated())
                .andDo(document("add-questions",
                        resource(ResourceSnippetParameters.builder()
                                .description("문제 추가")
                                .tag("question")
                                .summary("Add question")
                                .requestHeaders(HeaderDocumentation.headerWithName(HttpHeaders.CONTENT_TYPE)
                                        .description("questionUploadInfo-ContentType: application/json" +
                                                "questionImagesIn-ContentType:image.png\n" +
                                                "questionImagesOut-ContentType:image.png\n" +
                                                "commentaryImagesOut-ContentType:image.png\n" +
                                                "commentaryImagesOut-ContentType:image.png\n"+MediaType.MULTIPART_FORM_DATA_VALUE)
                                )
                                .build()
                        )
                ));
    }

    @Test
    void searchQuestions() throws Exception {
        String tags1 = "상황";
        String tags2 = "표지";
        String includes1 = "고속도로";
        int count = 1;
        mockMvc.perform(
                        get("/api/v1/exams/{examId}/questions?tags_category={tags}&tags_category={tags}&includes={includes}&count={count}", existExamId, tags1, tags2, includes1, count)
                )
                .andExpect(status().isOk())
                .andDo(document("Search-questions",
                        resource(ResourceSnippetParameters.builder()
                                .description("Exam ID를 통한 Questions 조회")
                                .tag("question")
                                .summary("Search questions")
                                .pathParameters(
                                        parameterWithName("examId").description("ExamId").type(SimpleType.INTEGER)
                                )
                                .queryParameters(
                                        parameterWithName("tags_category").description("문제의 태그 카테고리").type(SimpleType.STRING).optional(),
                                        parameterWithName("includes").description("문제에 포함된 키워드").type(SimpleType.STRING).optional(),
                                        parameterWithName("count").description("검색된 문제의 개수").type(SimpleType.INTEGER).optional()
                                )
                                .responseFields(
                                        fieldWithPath("questions").description("문제 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("questions[].id").description("문제의 고유 식별자").type(JsonFieldType.STRING),
                                        subsectionWithPath("questions[].type").description("문제의 유형").type(JsonFieldType.STRING),
                                        subsectionWithPath("questions[].question").description("문제 내용").type(JsonFieldType.STRING),
                                        subsectionWithPath("questions[].question_images_in").description("문제 설명 이미지 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("questions[].question_images_out").description("문제 정답 이미지 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("questions[].question_images_out[].url").description("이미지 URL").type(JsonFieldType.STRING),
                                        subsectionWithPath("questions[].question_images_out[].description").description("이미지 설명").type(JsonFieldType.STRING),
                                        subsectionWithPath("questions[].question_images_out[].attribute").description("이미지 속성").type(JsonFieldType.STRING),
                                        subsectionWithPath("questions[].options").description("보기 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("questions[].answers").description("정답 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("questions[].commentary").description("문제 해설").type(JsonFieldType.STRING),
                                        subsectionWithPath("questions[].commentary_images_in").description("해설 설명 이미지 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("questions[].commentary_images_out").description("해설 이미지 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("questions[].tags").description("문제의 태그 맵 정보").type(JsonFieldType.OBJECT),
                                        subsectionWithPath("questions[].tags.*").description("문제의 카테고리 태그 정보").type(JsonFieldType.ARRAY),
                                        fieldWithPath("size").description("문제의 개수").type(JsonFieldType.NUMBER)
                                )
                                .build()
                        )
                ));
    }

    @Test
    public void updateQuestions() throws Exception {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("id", "f7cc865e-f5b0-4974-9f3d-a86d782b1cb5");
        requestBody.put("question", "변경된 질문입니다.");
        requestBody.put("options", List.of("변경된 보기1", "변경된 보기2", "변경된 보기3", "변경된 보기4"));
        requestBody.put("answers", List.of(1, 3));
        requestBody.put("commentary", "변경된 설명입니다.");
        Map<String, Object> tag = new HashMap<>();
        tag.put("category", List.of("상황"));
        requestBody.put("tag", tag);

        mockMvc.perform(
                        put("/api/v1/questions")
                                .content(objectMapper.writeValueAsString(requestBody))
                                .contentType("application/json")
                )
                .andExpect(status().isOk())
                .andDo(document("update-question",
                        resource(ResourceSnippetParameters.builder()
                                .description("Question 내용 업데이트")
                                .tag("question")
                                .summary("Update question")
                                .requestFields(
                                        fieldWithPath("id").description("문제 ID").type(JsonFieldType.STRING),
                                        fieldWithPath("question").description("변경될 질문 내용").type(JsonFieldType.STRING),
                                        fieldWithPath("options").description("변경될 보기 내용").type(JsonFieldType.ARRAY),
                                        fieldWithPath("answers").description("변경될 정답").type(JsonFieldType.ARRAY),
                                        fieldWithPath("commentary").description("변경될 해설").type(JsonFieldType.STRING),
                                        fieldWithPath("tag").description("변경될 문제 태그").type(JsonFieldType.OBJECT),
                                        subsectionWithPath("tag.*").description("변경될 문제 태그 value").type(JsonFieldType.ARRAY)
                                )
                                .build()
                        )
                ));
    }


//    Objectmapper를 MockBean으로 안받고 Autowired함으로써 실제 데이터를 건드려버린다 -> 추후 수정 필요
//    @Test
//    void deleteQuestionsByExamID() throws Exception {
//
//        mockMvc.perform(
//                        delete("/api/v1/exams/{examId}/questions", existExamId)
//                )
//                .andExpect(status().isOk())
//                .andDo(document("delete-questions-by-examId",
//                        resource(ResourceSnippetParameters.builder()
//                                .description("해당되는 시험 ID Questions 삭제")
//                                .tag("question")
//                                .summary("Delete questions by examId")
//                                .pathParameters(
//                                        parameterWithName("examId").description("ExamId").type(SimpleType.INTEGER)
//                                )
//                                .build())
//                ));
//    }

    @Test
    void deleteQuestionsByQuestionID() throws Exception {
        String existQuestionId = "fee4fd71-3780-4ad1-a76f-a9a0ca052081";
        mockMvc.perform(
                        delete("/api/v1/questions/{questionId}", existQuestionId)
                )
                .andExpect(status().isOk())
                .andDo(document("delete-questions-by-questionId",
                        resource(ResourceSnippetParameters.builder()
                                .description("해당되는 문제 ID Question 삭제")
                                .tag("question")
                                .summary("Delete questions by questionId")
                                .pathParameters(
                                        parameterWithName("questionId").description("QuestionId").type(SimpleType.STRING)
                                )
                                .build())
                ));
    }
}