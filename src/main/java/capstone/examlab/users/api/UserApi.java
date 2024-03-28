package capstone.examlab.users.api;

import capstone.examlab.SessionConst;
import capstone.examlab.users.argumentresolver.Login;
import capstone.examlab.users.domain.User;
import capstone.examlab.users.dto.LoginDto;
import capstone.examlab.users.dto.UserAddDto;
import capstone.examlab.users.dto.UserStatusDto;
import capstone.examlab.users.service.UserService;
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
    public UserStatusDto status(@Login User user, HttpServletResponse response) {
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return UserStatusDto.FAIL;
        }
        return UserStatusDto.builder().isLogin(true).userName(user.getName()).build();
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    @PostMapping("/login")
    public List<ObjectError> login(@Validated @RequestBody LoginDto loginDto, BindingResult bindingResult,
                                   @RequestParam(defaultValue = "/") String redirectURL,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {
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
        return null;
    }

    @PostMapping
    public List<ObjectError> add(@Validated @RequestBody UserAddDto userAddDto, BindingResult bindingResult,
                                 HttpServletResponse response) throws IOException {

        if (!userAddDto.getPassword().equals(userAddDto.getPasswordConfirm())) {
            bindingResult.reject("passwordConfirm", "비밀번호가 일치하지 않습니다.");
        }

        if (userService.isUserIdExist(userAddDto.getUserId())) {
            bindingResult.reject("userId", "이미 사용중인 아이디입니다.");
        }

        if (bindingResult.hasErrors()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return bindingResult.getAllErrors();
        }

        userService.addUser(userAddDto);
        return null;
    }

}