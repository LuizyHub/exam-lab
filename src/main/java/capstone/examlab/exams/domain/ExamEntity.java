package capstone.examlab.exams.domain;

import capstone.examlab.users.domain.User;
import capstone.examlab.users.domain.UserEntity;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.*;

@Slf4j
@Entity
@Getter @Setter
public class ExamEntity extends Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = (UserEntity) user;
    }

    @Getter(AccessLevel.NONE) // 이 필드에 대한 getter는 생성하지 않음
    @Setter(AccessLevel.NONE) // 이 필드에 대한 setter는 생성하지 않음
    @Lob
    private String typesMetadata; // JSON 문자열을 저장하는 필드

    @Transient
    private Map<String, List<String>> types; // DB에 저장되지 않는 필드

    // ObjectMapper는 JSON 변환을 담당하는 클래스입니다.
    // Spring Boot 환경에서는 Bean으로 등록된 ObjectMapper 인스턴스를 주입받아 사용할 수 있습니다.
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public Map<String, List<String>> getTypes() {
        if (this.typesMetadata == null || this.typesMetadata.isEmpty()) {
            return new HashMap<>();
        }
        try {
            // metadata 문자열을 Map<String, List<String>>로 변환합니다.
            this.types = objectMapper.readValue(this.typesMetadata, new TypeReference<Map<String, List<String>>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            log.error("JSON 문자열을 Map으로 변환하는 중 에러가 발생했습니다. = {}", this.typesMetadata);
            // 변환 중 에러가 발생하면 빈 Map을 반환
            return new HashMap<>();
        }
        return this.types;
    }

    public void setTypes(Map<String, List<String>> types) {
        this.types = types;
        try {
            // Map을 JSON 문자열로 변환하여 metadata에 저장합니다.
            this.typesMetadata = objectMapper.writeValueAsString(types);
        } catch (IOException e) {
            log.error("Map을 JSON 문자열로 변환하는 중 에러가 발생했습니다. = {}", e.getMessage());
        }
    }

    private String pdfUrl;
}