package capstone.examlab.user.api;

import capstone.examlab.SessionConst;
import capstone.examlab.user.argumentresolver.Login;
import capstone.examlab.user.domain.User;
import capstone.examlab.user.dto.LoginDto;
import capstone.examlab.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserApi {

    private final UserService userService;

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

    @PostMapping("/login")
    public List<ObjectError> login(@Validated @RequestBody LoginDto loginDto, BindingResult bindingResult,
                                   @RequestParam(defaultValue = "/") String redirectURL,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws IOException {
        if (bindingResult.hasErrors()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return bindingResult.getAllErrors();
        }

        Optional<User> user = userService.findUserById(loginDto.getUserId());

        if (user.isEmpty() || !user.get().getPassword().equals(loginDto.getPassword())) {
            bindingResult.reject("loginFail", "아이디 또는 비밀번호가 맞지 않습니다.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return bindingResult.getAllErrors();
        }

        // 로그인 성공 처리
        // 세션이 있으면 있는 세션 반환, 없으면 신규 세션 생성
        HttpSession session = request.getSession();

        log.info("UserApi.login: user={}", user.get());

        session.setAttribute(SessionConst.LOGIN_USER, user.get().getId());
        response.sendRedirect(redirectURL);
        return null;
    }

}