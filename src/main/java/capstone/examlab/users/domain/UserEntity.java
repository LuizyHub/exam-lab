package capstone.examlab.users.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter @Setter
@Table(indexes = {
        @Index(name = "idx_user_id", columnList = "userId", unique = true)
})
public class UserEntity extends User{

    @Id
    private String id;

    private String userId;

    @PrePersist
    public void prePersist() {
        if (id == null) {
            id = UUID.randomUUID().toString();
        }
    }
}
