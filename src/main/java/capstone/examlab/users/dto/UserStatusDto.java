package capstone.examlab.users.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserStatusDto {
    public static final UserStatusDto FAIL = UserStatusDto.builder().isLogin(false).build();
    private boolean isLogin;
    private String userName;
}


