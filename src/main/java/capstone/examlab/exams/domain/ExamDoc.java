package capstone.examlab.exams.domain;

import capstone.examlab.users.domain.User;
import capstone.examlab.users.domain.UserDoc;
import jakarta.persistence.PrePersist;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document
@Getter @Setter
public class ExamDoc extends Exam {

    public static long sequence = 1L;

    @Id
    private String id;

    @Indexed(unique = true)
    private Long examId;

    private Map<String, List<String>> types;

    @DBRef
    private UserDoc userDoc;

    public User getUser() {
        return this.userDoc;
    }

    public void setUser(User user) {
        this.userDoc = (UserDoc) user;
    }
}
