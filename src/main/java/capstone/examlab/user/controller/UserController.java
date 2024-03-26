package capstone.examlab.user.controller;

import capstone.examlab.SessionConst;
import capstone.examlab.user.domain.User;
import capstone.examlab.user.dto.LoginDto;
import capstone.examlab.user.dto.UserAddDto;
import capstone.examlab.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
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

    private final ObjectProvider<User> userProvider;

    private final UserRepository userRepository;

    @PostMapping("/add")
    public String add(@Validated @ModelAttribute("user") UserAddDto userAddDto, BindingResult bindingResult) {

        if (!userAddDto.getPassword().equals(userAddDto.getPasswordConfirm())) {
            bindingResult.reject("passwordConfirm", "비밀번호가 일치하지 않습니다.");
        }

        if (userRepository.findByUserId(userAddDto.getUserId()).isPresent()) {
            bindingResult.reject("userId", "이미 사용중인 아이디입니다.");
        }

        if (bindingResult.hasErrors()) {
            return "users/addUserForm";
        }

        log.info("user={}", userAddDto);
        User user = userProvider.getObject();

        user.setUserId(userAddDto.getUserId());
        user.setName(userAddDto.getName());
        user.setPassword(userAddDto.getPassword());

        userRepository.save(user);

        return "redirect:/";
    }

    @PostMapping("/login")
    public String login(@Validated @ModelAttribute("user") LoginDto loginDto, BindingResult bindingResult,
                        @RequestParam(defaultValue = "/") String redirectURL,
                        HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            return "users/loginForm";
        }

        Optional<User> user = userRepository.findByUserId(loginDto.getUserId());

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
    public String login(@ModelAttribute("user") LoginDto loginDto) {
        return "users/loginForm";
    }
    @GetMapping("/add")
    public String add(@ModelAttribute("user") UserAddDto userAddDto) {
        return "users/addUserForm";
    }
}
