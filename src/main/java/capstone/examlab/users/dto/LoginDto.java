package capstone.examlab.users.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDto {

    @NotBlank
    @Email
    private String userId;

    @NotBlank
    private String password;
}
