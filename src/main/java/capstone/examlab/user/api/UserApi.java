package capstone.examlab.user.api;

import capstone.examlab.user.argumentresolver.Login;
import capstone.examlab.user.domain.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserApi {

    @GetMapping("/status")
    public String status(@Login User user, HttpServletResponse response) {
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return "fail";
        }
        return user.getName();
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "ok";
    }

}
