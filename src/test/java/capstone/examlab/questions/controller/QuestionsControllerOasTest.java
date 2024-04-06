package capstone.examlab.questions.controller;

import capstone.examlab.RestDocsOpenApiSpecTest;
import capstone.examlab.questions.dto.ImageDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;

import com.epages.restdocs.apispec.ResourceSnippetParameters;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;

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

        System.out.println("QuestionUploadInfo: " + objectMapper.writeValueAsString(questionUploadInfo));

        this.mockMvc.perform(
                        MockMvcRequestBuilders.multipart("/api/v1/exams/{examId}/questions",existExamId)
                                .file(new MockMultipartFile("QuestionUploadInfo", "", "application/json", objectMapper.writeValueAsString(questionUploadInfo).getBytes()))
                                .file(new MockMultipartFile("questionImagesIn", "image1.png", "image/png", "image1".getBytes()))
                                .file(new MockMultipartFile("questionImagesOut", "image2.png", "image/png", "image2".getBytes()))
                                .file(new MockMultipartFile("commentaryImagesIn", "image3.png", "image/png", "image3".getBytes()))
                                .file(new MockMultipartFile("commentaryImagesOut", "image4.png", "image/png", "image4".getBytes()))
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("add-questions",
                        resource(ResourceSnippetParameters.builder()
                                .description("시험에 문제 추가")
                                .tag("questions")
                                .summary("Add questions")
                                .requestFields(
                                        fieldWithPath("type").description("문제 유형").type(JsonFieldType.STRING),
                                        fieldWithPath("question").description("문제").type(JsonFieldType.STRING),
                                        fieldWithPath("options").description("보기 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("options[]").description("보기").type(JsonFieldType.STRING),
                                        fieldWithPath("answers").description("정답 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("answers[]").description("정답").type(JsonFieldType.NUMBER),
                                        fieldWithPath("questionImagesTextIn").description("문제 설명 이미지 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("questionImagesTextIn[].url").description("이미지 URL").type(JsonFieldType.STRING),
                                        subsectionWithPath("questionImagesTextIn[].description").description("설명").type(JsonFieldType.STRING),
                                        subsectionWithPath("questionImagesTextIn[].attribute").description("속성").type(JsonFieldType.STRING),
                                        fieldWithPath("questionImagesTextOut").description("문제 정답 이미지 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("questionImagesTextOut[].url").description("이미지 URL").type(JsonFieldType.STRING),
                                        subsectionWithPath("questionImagesTextOut[].description").description("설명").type(JsonFieldType.STRING),
                                        subsectionWithPath("questionImagesTextOut[].attribute").description("속성").type(JsonFieldType.STRING),
                                        fieldWithPath("commentary").description("해설").type(JsonFieldType.STRING),
                                        fieldWithPath("commentaryImagesTextIn").description("해설 설명 이미지 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("commentaryImagesTextIn[].url").description("이미지 URL").type(JsonFieldType.STRING),
                                        subsectionWithPath("commentaryImagesTextIn[].description").description("설명").type(JsonFieldType.STRING),
                                        subsectionWithPath("commentaryImagesTextIn[].attribute").description("속성").type(JsonFieldType.STRING),
                                        fieldWithPath("commentaryImagesTextOut").description("해설 이미지 목록").type(JsonFieldType.ARRAY),
                                        subsectionWithPath("commentaryImagesTextOut[].url").description("이미지 URL").type(JsonFieldType.STRING),
                                        subsectionWithPath("commentaryImagesTextOut[].description").description("설명").type(JsonFieldType.STRING),
                                        subsectionWithPath("commentaryImagesTextOut[].attribute").description("속성").type(JsonFieldType.STRING)
                                )
                                .build()
                        )
                ));
    }
/*
    @MockBean
    private QuestionsService questionsService;

    @MockBean
    private ExamRepository examRepository;

    @MockBean
    private DriverLicenseQuestionsRepository driverLicenseQuestionsRepository;

    private final Long existExamId = 1L;

    private final List<String> existTags = List.of("상황", "법");

    @BeforeEach
    public void beforeTest() {
        when(examRepository.existsById(existExamId)).thenReturn(true);
        when(questionsService.findByDriverLicenseQuestions(any(), any())).thenReturn(new QuestionsList());
        when(driverLicenseQuestionsRepository.existsByTags(existTags.get(0))).thenReturn(true);
        when(driverLicenseQuestionsRepository.existsByTags(existTags.get(1))).thenReturn(true);
    }

    @Test
    void validQuestionControllerTest() throws Exception {
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("tags", existTags.get(0))
                        .queryParam("tags", existTags.get(1))
                        .queryParam("count", String.valueOf(3))
                        .queryParam("includes", "고속도로"))
                .andExpect(status().isOk());
    }

    // 없는 문제 ID로 요청을 보내면 400 Bad Request를 반환하는지 테스트
    @Test
    void validExamIdTest() throws Exception {
        // When
        Long examId = 0L;

        //Then
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", examId))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId))
                .andExpect(status().isOk());
    }

    // 없는 태그로 요청을 보내면 400 Bad Request를 반환하는 테스트
    @Test
    void invalidTagsTest() throws Exception {
        // Then
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("tags", existTags.get(0))
                        .queryParam("tags", "없는태그"))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("tags", existTags.get(0))
                        .queryParam("tags", existTags.get(1)))
                .andExpect(status().isOk());
    }

    // 양수가 아닌 count로 요청을 보내면 400 Bad Request를 반환하는 테스트
    @Test
    void invalidCountTest() throws Exception {
        // Then
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("count", String.valueOf(-3)))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("count", String.valueOf(3)))
                .andExpect(status().isOk());
    }

    // 글자수 및 빈칸 적용된 유효하지않은 inlucds 요청시 400 Bad Request를 반환하는 테스트
    @Test
    void invalidIncludesTest() throws Exception {
        // Then
        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("includes", "두 단어"))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("includes", "한"))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/exams/{examId}/questions", existExamId)
                        .queryParam("includes", "한단어한글자이상"))
                .andExpect(status().isOk());
    }*/
}