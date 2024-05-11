package capstone.examlab.workbooks.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "workbooks")
public class Workbook {
    @Id
    private String id;
    private String title;
    private String summary;
    private String contentJson; // JsonNode 대신 String을 사용

    public void setContent(JsonNode content) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        this.contentJson = mapper.writeValueAsString(content); // JsonNode를 String으로 변환
    }

    public JsonNode getContent() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readTree(this.contentJson); // String을 JsonNode로 변환
    }
    private String userId;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime updatedDate;

    public Workbook(String id, String title, String summary, JsonNode content, String userId) throws JsonProcessingException {
        this.id = id;
        this.title = title;
        this.summary = summary;
        setContent(content);
        this.userId = userId;
    }
}
