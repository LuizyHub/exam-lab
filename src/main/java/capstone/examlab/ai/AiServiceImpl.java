package capstone.examlab.ai;

import capstone.examlab.ai.dto.Questions;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final ChatClient chatClient;

    private final ObjectMapper objectMapper;

    private static final String PRE_STATEMENT = "public class Question {\n" +
            "    // 문제\n" +
            "    private String question;\n" +
            "    \n" +
            "    // 보기\n" +
            "    private List<String> options;\n" +
            "    \n" +
            "    // 정답\n" +
            "    private List<Integer> answers;\n" +
            "    \n" +
            "    // 해설\n" +
            "    private String commentary;\n" +
            "}\n" +
            "아래 내용을 참고해서 한국어로 시험문제를 만들어줘.\n" +
            "Question 객체에 파싱될 수 있는 json 형태로 5개를 배열로 만들어줘.\n\n";

    private static final OpenAiChatOptions options = OpenAiChatOptions.builder()
            .withModel("gpt-4-turbo")
            .withResponseFormat(new OpenAiApi.ChatCompletionRequest.ResponseFormat("json_object"))
            .build();

    @Override
    public Questions generateQuestions(String content) throws JsonProcessingException {
        ChatResponse response = chatClient.call(
                new Prompt(PRE_STATEMENT + content, options)
        );
        Questions questions = objectMapper.readValue(response.getResult().getOutput().getContent(), Questions.class);
        return questions;
    }
}
