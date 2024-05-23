package capstone.examlab.token;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Service
public class TokenServicePython implements TokenService{


    @Override
    public int getTokenCount(String content) {
        int tokenCount = 0;
        try {
            // ClassPathResource를 사용하여 리소스 경로를 가져옵니다.
            Resource resource = new ClassPathResource("scripts/token_count.py");

            // 리소스를 임시 파일로 복사합니다.
            Path tempScript = Files.createTempFile("token_count", ".py");
            try (InputStream inputStream = resource.getInputStream()) {
                Files.copy(inputStream, tempScript, StandardCopyOption.REPLACE_EXISTING);
            }
            // Python 실행 명령어와 인자를 설정합니다.
            String[] command = new String[]{"python3", tempScript.toAbsolutePath().toString(), content};

            // 프로세스 빌더를 생성하고 실행합니다.
            ProcessBuilder processBuilder = new ProcessBuilder(command);
            Process process = processBuilder.start();

            // 프로세스의 출력을 읽어옵니다.
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                if ((line = reader.readLine()) != null) {
                    tokenCount = Integer.parseInt(line);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tokenCount;
    }
}
