package capstone.examlab.users.domain;

import capstone.examlab.users.dto.UserAddDto;
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

    public void setByUserAddDto(UserAddDto userAddDto) {
        this.setUserId(userAddDto.getUserId());
        this.setName(userAddDto.getName());
        this.setPassword(userAddDto.getPassword());
    }
}
