package capstone.examlab.token;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@Tag("basic_test")
class TokenServicePythonTest {
    TokenService tokenService = new TokenServicePython();

    @Test
    void getTokenCount() {
        String content = "Hello, World!";
        int tokenCount = tokenService.getTokenCount(content);
        assertEquals(4, tokenCount);
    }
}