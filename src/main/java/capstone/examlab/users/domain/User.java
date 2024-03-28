package capstone.examlab.users.domain;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class User {

    protected String name;

    protected String password;

    abstract public String getId();

    abstract public void setId(String id);

    abstract public String getUserId();

    abstract public void setUserId(String userId);
}
