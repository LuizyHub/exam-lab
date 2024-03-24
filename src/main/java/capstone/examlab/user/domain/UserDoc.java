package capstone.examlab.user.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter @Setter
public class UserDoc extends User{

    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;
}
