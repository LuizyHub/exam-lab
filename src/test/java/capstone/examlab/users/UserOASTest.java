package capstone.examlab.users;

import capstone.examlab.RestDocsOpenApiSpecTest;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpSession;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@Tag("openapi_test")
class UserOASTest extends RestDocsOpenApiSpecTest {

    private final String userId = "lab1@gmail.com";
    private final String userPw = "lab111!";
    private final String userNm = "lab1";

    @Autowired
    ObjectMapper objectMapper;

    MockHttpSession session;

    @AfterEach
    void tearDown() throws Exception {
        doLogout();
    }

    @Test
    void statusTest() throws Exception {
        //when logged in
        doLogin();

        this.mockMvc.perform(
                        get("/api/v1/users/status").session(session)
                                .contentType("application/json")
                )
                .andExpect(status().isOk())
                .andDo(document("user status",
                        resource(ResourceSnippetParameters.builder()
                                .description("로그인 상태를 확인합니다." +
                                        "로그인 상태일 경우 200과 userName을 반환합니다" +
                                        "로그인 상태가 아닌 경우 401 Unauthorized를 반환합니다.")
                                .tag("users")
                                .summary("Get user status")
                                .responseFields(
                                        fieldWithPath("login").description("로그인 여부"),
                                        fieldWithPath("user_name").description("사용자 이름")
                                )
                                .build()
                        )
                ));
    }

    @Test
    void logout() throws Exception {
        //when logged in
        doLogin();
        // 동일 세션을 사용하여 로그아웃 요청
        mockMvc.perform(post("/api/v1/users/logout").session(session))
                .andExpect(status().isOk())
                .andDo(document("logout", resource(ResourceSnippetParameters.builder()
                        .description("로그아웃")
                        .tag("users")
                        .summary("Logout")
                        .build()
                )));

        // 동일 세션을 사용하여 로그아웃 상태 확인
        mockMvc.perform(get("/api/v1/users/status").session(session))
                .andExpect(status().isUnauthorized());

    }

    @Test
    void login() throws Exception {
        Map<String, String> request = new HashMap<>() {{
            put("user_id", userId);
            put("password", userPw);
        }};

        session = (MockHttpSession) mockMvc.perform(post("/api/v1/users/login")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andDo(document("login", resource(ResourceSnippetParameters.builder()
                        .description("로그인" +
                                "성공할 경우 redirect 시킵니다" +
                                "실패할 경우 400 Bad Request를 반환합니다.")
                        .tag("users")
                        .summary("Login")
                        .requestFields(
                                fieldWithPath("user_id").description("User id").type("String"),
                                fieldWithPath("password").description("Password").type("String")
                        )
                        .build()
                )))
                .andReturn().getRequest().getSession();

        // 로그인 상태 확인
        mockMvc.perform(get("/api/v1/users/status").session(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("login").value(true))
                .andExpect(jsonPath("user_name").value(userNm));
    }

    @Test
    @Transactional
    void userAdd() throws Exception {
        final String userName = UUID.randomUUID().toString();
        final String userId = String.format("%s@gmail.com", userName);
        final String userPw = String.format("%s!", userName);
        final String userPwConfirm = userPw;
        Map<String, String> request = new HashMap<>() {{
            put("user_id", userId);
            put("password", userPw);
            put("password_confirm", userPwConfirm);
            put("name", userName);
        }};

        mockMvc.perform(post("/api/v1/users")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andDo(document("user add", resource(ResourceSnippetParameters.builder()
                        .description("사용자 추가" +
                                "성공할 경우 200 OK를 반환합니다" +
                                "실패할 경우 400 Bad Request를 반환합니다.")
                        .tag("users")
                        .summary("Add user")
                        .requestFields(
                                fieldWithPath("user_id").description("User id"),
                                fieldWithPath("password").description("Password"),
                                fieldWithPath("password_confirm").description("Password confirm"),
                                fieldWithPath("name").description("User name")
                        )
                        .build()
                )));
    }

    void doLogin() throws Exception {
        Map<String, String> request = new HashMap<>() {{
            put("user_id", userId);
            put("password", userPw);
        }};
        session = (MockHttpSession) mockMvc.perform(post("/api/v1/users/login")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn().getRequest().getSession();
    }

    void doLogout() throws Exception {
        if (session == null) return;
        this.mockMvc.perform(
                post("/api/v1/users/logout").session(session)
        );
    }

}