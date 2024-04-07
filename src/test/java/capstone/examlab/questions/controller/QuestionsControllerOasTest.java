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


import java.util.*;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.headers.HeaderDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;

import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestPartFields;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Tag("openapi_test")
class QuestionsControllerOasTest extends RestDocsOpenApiSpecTest {
    private final Long existExamId = 1L;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    public void beforeTest() {

    }

    @Test
    void addQuestionsByExamId() throws Exception {
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
        Map<String, List<String>> tagsMap = new HashMap<>();
        tagsMap.put("category", List.of("화물"));
        questionUploadInfo.put("tagsMap", tagsMap);
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
                .andExpect(status().isOk())
                .andDo(document("Add-questions",
                        requestHeaders(
                                HeaderDocumentation.headerWithName(HttpHeaders.CONTENT_TYPE).description(MediaType.MULTIPART_FORM_DATA_VALUE)
                        ),
                        requestParts(
                                partWithName("questionUploadInfo").description("설명"),
                                partWithName("questionImagesIn").description("리뷰 이미지 파일1"),
                                partWithName("questionImagesOut").description("리뷰 이미지 파일2"),
                                partWithName("commentaryImagesIn").description("리뷰 이미지 파일3"),
                                partWithName("commentaryImagesOut").description("리뷰 이미지 파일4")
                        )
//                        requestPartFields("questionUploadInfo",
//                                        fieldWithPath("type").description("문제 유형").type(JsonFieldType.STRING),
//                                        fieldWithPath("question").description("문제").type(JsonFieldType.STRING),
//                                        fieldWithPath("options").description("보기 목록").type(JsonFieldType.ARRAY),
////                                        subsectionWithPath("options[]").description("보기").type(JsonFieldType.STRING),
//                                        fieldWithPath("questionImagesTextIn").description("문제 설명 이미지 목록").type(JsonFieldType.ARRAY),
//                                        subsectionWithPath("questionImagesTextIn[].url").description("이미지 URL").type(JsonFieldType.STRING),
//                                        subsectionWithPath("questionImagesTextIn[].description").description("설명").type(JsonFieldType.STRING),
//                                        subsectionWithPath("questionImagesTextIn[].attribute").description("속성").type(JsonFieldType.STRING),
//                                        fieldWithPath("questionImagesTextOut").description("문제 정답 이미지 목록").type(JsonFieldType.ARRAY),
//                                        subsectionWithPath("questionImagesTextOut[].url").description("이미지 URL").type(JsonFieldType.STRING),
//                                        subsectionWithPath("questionImagesTextOut[].description").description("설명").type(JsonFieldType.STRING),
//                                        subsectionWithPath("questionImagesTextOut[].attribute").description("속성").type(JsonFieldType.STRING),
//                                        fieldWithPath("answers").description("정답 목록").type(JsonFieldType.ARRAY),
////                                        subsectionWithPath(".answers").description("정답").type(JsonFieldType.NUMBER),
//                                        fieldWithPath("tagsMap").description("태그 맵 정보").type(JsonFieldType.OBJECT),
//                                        subsectionWithPath("tagsMap.category").description("카테고리 태그 정보").type(JsonFieldType.ARRAY),
////                                        subsectionWithPath("tagsMap.category[]").description("카테고리 태그").type(JsonFieldType.STRING),
//                                        fieldWithPath("commentary").description("해설").type(JsonFieldType.STRING),
//                                        fieldWithPath("commentaryImagesTextIn").description("해설 설명 이미지 목록").type(JsonFieldType.ARRAY),
//                                        subsectionWithPath("commentaryImagesTextIn[].url").description("이미지 URL").type(JsonFieldType.STRING),
//                                        subsectionWithPath("commentaryImagesTextIn[].description").description("설명").type(JsonFieldType.STRING),
//                                        subsectionWithPath("commentaryImagesTextIn[].attribute").description("속성").type(JsonFieldType.STRING),
//                                        fieldWithPath("commentaryImagesTextOut").description("해설 이미지 목록").type(JsonFieldType.ARRAY),
//                                        subsectionWithPath("commentaryImagesTextOut[].url").description("이미지 URL").type(JsonFieldType.STRING),
//                                        subsectionWithPath("commentaryImagesTextOut[].description").description("설명").type(JsonFieldType.STRING),
//                                        subsectionWithPath("commentaryImagesTextOut[].attribute").description("속성").type(JsonFieldType.STRING)
//                        )
                ));
//                                 resource(ResourceSnippetParameters.builder()
//                                .description("시험에 문제 추가")
//                                .tag("questions")
//                                .summary("Add questions")
//                                .requestFields(
//                                        fieldWithPath("questionUploadInfo").description("질문 업로드 정보")
//                                        fieldWithPath("type").description("문제 유형").type(JsonFieldType.STRING),
//                                        fieldWithPath("question").description("문제").type(JsonFieldType.STRING),
//                                        fieldWithPath("options").description("보기 목록").type(JsonFieldType.ARRAY),
////                                        subsectionWithPath("options[]").description("보기").type(JsonFieldType.STRING),
//                                        fieldWithPath("questionImagesTextIn").description("문제 설명 이미지 목록").type(JsonFieldType.ARRAY),
////                                        subsectionWithPath("questionImagesTextIn[].url").description("이미지 URL").type(JsonFieldType.STRING),
////                                        subsectionWithPath("questionImagesTextIn[].description").description("설명").type(JsonFieldType.STRING),
////                                        subsectionWithPath("questionImagesTextIn[].attribute").description("속성").type(JsonFieldType.STRING),
//                                        fieldWithPath("questionImagesTextOut").description("문제 정답 이미지 목록").type(JsonFieldType.ARRAY),
////                                        subsectionWithPath("questionImagesTextOut[].url").description("이미지 URL").type(JsonFieldType.STRING),
////                                        subsectionWithPath("questionImagesTextOut[].description").description("설명").type(JsonFieldType.STRING),
////                                        subsectionWithPath("questionImagesTextOut[].attribute").description("속성").type(JsonFieldType.STRING),
//                                        fieldWithPath("answers").description("정답 목록").type(JsonFieldType.ARRAY),
////                                        subsectionWithPath(".answers").description("정답").type(JsonFieldType.NUMBER),
//                                        fieldWithPath("tagsMap").description("태그 맵 정보").type(JsonFieldType.OBJECT),
////                                        subsectionWithPath("tagsMap.category").description("카테고리 태그 정보").type(JsonFieldType.ARRAY),
////                                        subsectionWithPath("tagsMap.category[]").description("카테고리 태그").type(JsonFieldType.STRING),
//                                        fieldWithPath("commentary").description("해설").type(JsonFieldType.STRING),
//                                        fieldWithPath("commentaryImagesTextIn").description("해설 설명 이미지 목록").type(JsonFieldType.ARRAY),
////                                        subsectionWithPath("commentaryImagesTextIn[].url").description("이미지 URL").type(JsonFieldType.STRING),
////                                        subsectionWithPath("commentaryImagesTextIn[].description").description("설명").type(JsonFieldType.STRING),
////                                        subsectionWithPath("commentaryImagesTextIn[].attribute").description("속성").type(JsonFieldType.STRING),
//                                        fieldWithPath("commentaryImagesTextOut").description("해설 이미지 목록").type(JsonFieldType.ARRAY)
////                                        subsectionWithPath("commentaryImagesTextOut[].url").description("이미지 URL").type(JsonFieldType.STRING),
////                                        subsectionWithPath("commentaryImagesTextOut[].description").description("설명").type(JsonFieldType.STRING),
////                                        subsectionWithPath("commentaryImagesTextOut[].attribute").description("속성").type(JsonFieldType.STRING)
    }
}
