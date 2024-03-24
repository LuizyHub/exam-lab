package capstone.examlab.user.api;

import capstone.examlab.user.domain.User;
import capstone.examlab.user.dto.LoginDto;
import capstone.examlab.user.dto.UserAddDto;
import capstone.examlab.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@Controller
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserApi {

    private final ObjectProvider<User> userProvider;

    private final UserRepository userRepository;

    @PostMapping("/add")
    public String add(@Validated @ModelAttribute("user") UserAddDto userAddDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return "users/addUserForm";
        }

        log.info("user={}", userAddDto);
        User user = userProvider.getObject();

        user.setUserId(userAddDto.getUserId());
        user.setName(userAddDto.getName());
        user.setPassword(userAddDto.getPassword());

        user = userRepository.save(user);
        log.info("user={}", user);
        log.info("userId={}", user.getId());

        return "redirect:/api/v1/users/login";
    }

    @PostMapping("/login")
    public String login(@Validated @ModelAttribute LoginDto loginDto, BindingResult bindingResult,
                        @RequestParam(defaultValue = "/") String redirectURL) throws IOException {
        if (bindingResult.hasErrors()) {
            return "users/loginForm";
        }

        log.info("loginDto={}", loginDto);

        return "redirect:" + redirectURL;
    }
}
