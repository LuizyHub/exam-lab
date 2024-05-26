package capstone.examlab.users.controller;

import capstone.examlab.SessionConst;
import capstone.examlab.users.argumentresolver.Login;
import capstone.examlab.users.domain.User;
import capstone.examlab.users.dto.LoginDto;
import capstone.examlab.users.dto.UserAddDto;
import capstone.examlab.users.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@Controller
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/add")
    public String add(@Validated @ModelAttribute("user") UserAddDto userAddDto, BindingResult bindingResult,
                      @RequestParam(defaultValue = "/") String redirectURL) {

        if (!userAddDto.getPassword().equals(userAddDto.getPasswordConfirm())) {
            bindingResult.reject("passwordConfirm", "비밀번호가 일치하지 않습니다.");
        }

        if (userService.isUserIdExist(userAddDto.getUserId())) {
            bindingResult.reject("userId", "이미 사용중인 아이디입니다.");
        }

        if (bindingResult.hasErrors()) {
            return "users/addUserForm";
        }

        userService.addUser(userAddDto);

        return "redirect:" + redirectURL;
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "redirect:/users/login";
    }


    @PostMapping("/login")
    public String login(@Login User loggedInUser,
                        @Validated @ModelAttribute("user") LoginDto loginDto, BindingResult bindingResult,
                        @RequestParam(defaultValue = "/") String redirectURL,
                        HttpServletRequest request) {

        // 압력 검증 오류
        if (bindingResult.hasErrors()) {
            return "users/loginForm";
        }

        Optional<User> user = userService.findUserById(loginDto.getUserId());

        // 사용자가 없거나 비밀번호가 일치하지 않으면 로그인 폼으로 이동
        if (user.isEmpty() || !user.get().getPassword().equals(loginDto.getPassword())) {
            bindingResult.reject("loginFail", "아이디 또는 비밀번호가 맞지 않습니다.");
            return "users/loginForm";
        }

        // 로그인 성공 처리
        // 세션이 있으면 있는 세션 반환, 없으면 신규 세션 생성
        HttpSession session = request.getSession();

        session.setAttribute(SessionConst.LOGIN_USER, user.get().getId());

        return "redirect:" + redirectURL;
    }

    @GetMapping("/login")
    public String login(@Login User loggedInUser,
                        @ModelAttribute("user") LoginDto loginDto) {
        // 이미 로그인한 사용자가 있으면 로그인된 사용자 폼으로 이동
        if (loggedInUser != null) {
            return "users/loggedInForm";
        }

        return "users/loginForm";
    }

    @GetMapping("/add")
    public String add(@ModelAttribute("user") UserAddDto userAddDto) {
        return "users/addUserForm";
    }
}
