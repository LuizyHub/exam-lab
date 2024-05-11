package capstone.examlab.workbook.controller;

import capstone.examlab.RestDocsOpenApiSpecTest;
import capstone.examlab.workbooks.repository.WorkbookRepository;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.epages.restdocs.apispec.SimpleType;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MvcResult;

import java.util.HashMap;
import java.util.Map;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@Tag("openapi_test")
public class WorkbookControllerOasTest extends RestDocsOpenApiSpecTest {
    private final String userId = "lab1@gmail.com";
    private final String userPw = "lab111!";

    String workbookId;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    WorkbookRepository workbookRepository;

    @BeforeEach
    void setUp() throws Exception {
        workbookId = addWorkbookAndGetId();
    }

    @AfterEach
    void tearDown() {
        if (workbookId != null)
            workbookRepository.deleteById(workbookId);
    }

    @Test
    void getWorkbooks() throws Exception {
        mockMvc.perform(get("/api/v1/workbooks")
                        .session(doLogin()))
                .andExpect(status().isOk())
                .andDo(document("workbooks-get",
                        resource(ResourceSnippetParameters.builder()
                                .tag("workbooks")
                                .description("사용자의 시험지 목록을 조회한다.    \n- 로그인 되어있어야 합니다.")
                                .summary("사용자의 문제집 목록을 조회한다.")
                                .responseSchema(Schema.schema("workbook-summary-list"))
                                .build())));
    }

    @Test
    void createWorkbook() throws Exception {
        mockMvc.perform(post("/api/v1/workbooks")
                        .session(doLogin())
                        .contentType("application/json")
                        .content(content))
                .andExpect(status().isCreated())
                .andDo(document("workbooks-post",
                        resource(ResourceSnippetParameters.builder()
                                .tag("workbooks")
                                .description("시험지를 생성한다.    \n- 로그인 되어있어야 합니다.  \n- content에는 어떤값이 들어가도 json형식만 맞다면 동작합니다.")
                                .summary("시험지를 생성한다.")
                                .requestSchema(Schema.schema("workbook-create"))
                                .responseSchema(Schema.schema("workbook"))
                                .build())));
    }

    @Test
    void getWorkbook() throws Exception {
        mockMvc.perform(get("/api/v1/workbooks/{workbookId}", workbookId)
                        .session(doLogin()))
                .andExpect(status().isOk())
                .andDo(document("workbooks-get-id",
                        resource(ResourceSnippetParameters.builder()
                                .tag("workbooks")
                                .description("시험지를 조회한다.    \n- 로그인 되어있어야 합니다.  \n- content에는 어떤값이 들어가도 json형식만 맞다면 동작합니다.")
                                .summary("시험지를 조회한다.")
                                .pathParameters(
                                        parameterWithName("workbookId").description("시험지 ID").type(SimpleType.STRING)
                                )
                                .responseSchema(Schema.schema("workbook"))
                                .build())));

    }

    @Test
    void updateWorkbook() throws Exception {
        mockMvc.perform(put("/api/v1/workbooks/{workbookId}", workbookId)
                        .session(doLogin())
                        .contentType("application/json")
                        .content(content))
                .andExpect(status().isOk())
                .andDo(document("workbooks-put",
                        resource(ResourceSnippetParameters.builder()
                                .tag("workbooks")
                                .description("시험지를 수정한다.    \n- 로그인 되어있어야 합니다.  \n- content에는 어떤값이 들어가도 json형식만 맞다면 동작합니다.")
                                .summary("시험지를 수정한다.")
                                .pathParameters(
                                        parameterWithName("workbookId").description("시험지 ID").type(SimpleType.STRING)
                                )
                                .requestSchema(Schema.schema("workbook"))
                                .responseSchema(Schema.schema("workbook"))
                                .build())));
    }

    @Test
    void deleteWorkbook() throws Exception {
        mockMvc.perform(delete("/api/v1/workbooks/{workbookId}", workbookId)
                        .session(doLogin()))
                .andExpect(status().isOk())
                .andDo(document("workbooks-delete",
                        resource(ResourceSnippetParameters.builder()
                                .tag("workbooks")
                                .description("시험지를 삭제한다.    \n- 로그인 되어있어야 합니다")
                                .summary("시험지를 삭제한다.")
                                .pathParameters(
                                        parameterWithName("workbookId").description("시험지 ID").type(SimpleType.STRING)
                                )
                                .build())));
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

    String addWorkbookAndGetId() throws Exception {

        MvcResult result = mockMvc.perform(post("/api/v1/workbooks")
                        .session(doLogin())
                        .contentType("application/json")
                        .content(content))
                .andExpect(status().isCreated())
                .andReturn();
        return objectMapper.readTree(result.getResponse().getContentAsString()).get("message").get("id").asText();
    }

    final String content = "{\n" +
            "\t\"title\": \"한국인 상식 시험지\",\n" +
            "    \"summary\": \"힌국인 상식 시험지 입니다.\",\n" +
            "\t\"content\": {\n" +
            "        \"questions\": [\n" +
            "            {\n" +
            "                \"id\": \"676cf9d7-9720-4403-b19b-e8f4d0777892\",\n" +
            "                \"type\": \"객관식\",\n" +
            "                \"question\": \"다음 중 1988년 서울 올림픽의 마스코트는 무엇입니까?\",\n" +
            "                \"question_images_in\": [],\n" +
            "                \"question_images_out\": [],\n" +
            "                \"options\": [\n" +
            "                    \"호돌이\",\n" +
            "                    \"수호랑\",\n" +
            "                    \"반다비\",\n" +
            "                    \"하니\"\n" +
            "                ],\n" +
            "                \"answers\": [\n" +
            "                    0\n" +
            "                ],\n" +
            "                \"commentary\": \"1988년 서울 올림픽의 마스코트는 호돌이입니다.\",\n" +
            "                \"commentary_images_in\": [],\n" +
            "                \"commentary_images_out\": [],\n" +
            "                \"tags\": null\n" +
            "            },\n" +
            "            {\n" +
            "                \"id\": \"177b65c2-59e0-4ab6-8b2a-675c7dc76492\",\n" +
            "                \"type\": \"객관식\",\n" +
            "                \"question\": \"한글을 창제한 왕인 다음 중 누구입니까?\",\n" +
            "                \"question_images_in\": [],\n" +
            "                \"question_images_out\": [],\n" +
            "                \"options\": [\n" +
            "                    \"세종대왕\",\n" +
            "                    \"태조\",\n" +
            "                    \"광해군\",\n" +
            "                    \"영조\"\n" +
            "                ],\n" +
            "                \"answers\": [\n" +
            "                    0\n" +
            "                ],\n" +
            "                \"commentary\": \"한글을 창제한 왕은 세종대왕입니다.\",\n" +
            "                \"commentary_images_in\": [],\n" +
            "                \"commentary_images_out\": [],\n" +
            "                \"tags\": null\n" +
            "            },\n" +
            "            {\n" +
            "                \"id\": \"416f8407-96ae-4e9a-97a8-efecdf1fd0c2\",\n" +
            "                \"type\": \"객관식\",\n" +
            "                \"question\": \"한글은 누가 창제하였습니까?\",\n" +
            "                \"question_images_in\": [],\n" +
            "                \"question_images_out\": [],\n" +
            "                \"options\": [\n" +
            "                    \"이순신\",\n" +
            "                    \"세종대왕\",\n" +
            "                    \"광개토대왕\",\n" +
            "                    \"김구\"\n" +
            "                ],\n" +
            "                \"answers\": [\n" +
            "                    1\n" +
            "                ],\n" +
            "                \"commentary\": \"한글은 세종대왕에 의해 창제되었습니다.\",\n" +
            "                \"commentary_images_in\": [],\n" +
            "                \"commentary_images_out\": [],\n" +
            "                \"tags\": null\n" +
            "            },\n" +
            "            {\n" +
            "                \"id\": \"1808e549-d341-47f8-90e2-603e141a4d24\",\n" +
            "                \"type\": \"객관식\",\n" +
            "                \"question\": \"다음 중 한국의 전통 음식이 아닌 것은?\",\n" +
            "                \"question_images_in\": [],\n" +
            "                \"question_images_out\": [],\n" +
            "                \"options\": [\n" +
            "                    \"김치\",\n" +
            "                    \"스시\",\n" +
            "                    \"불고기\",\n" +
            "                    \"비빔밥\"\n" +
            "                ],\n" +
            "                \"answers\": [\n" +
            "                    1\n" +
            "                ],\n" +
            "                \"commentary\": \"스시는 일본의 전통 음식입니다.\",\n" +
            "                \"commentary_images_in\": [],\n" +
            "                \"commentary_images_out\": [],\n" +
            "                \"tags\": null\n" +
            "            },\n" +
            "            {\n" +
            "                \"id\": \"b78fef73-7237-40e2-8a68-dca7a9611a2a\",\n" +
            "                \"type\": \"객관식\",\n" +
            "                \"question\": \"다음 중 한국의 수도는 어디입니까?\",\n" +
            "                \"question_images_in\": [],\n" +
            "                \"question_images_out\": [],\n" +
            "                \"options\": [\n" +
            "                    \"서울\",\n" +
            "                    \"부산\",\n" +
            "                    \"인천\",\n" +
            "                    \"대구\"\n" +
            "                ],\n" +
            "                \"answers\": [\n" +
            "                    0\n" +
            "                ],\n" +
            "                \"commentary\": \"서울은 대한민국의 수도입니다.\",\n" +
            "                \"commentary_images_in\": [],\n" +
            "                \"commentary_images_out\": [],\n" +
            "                \"tags\": null\n" +
            "            }\n" +
            "        ],\n" +
            "        \"size\": 5\n" +
            "    }\n" +
            "}";
}
