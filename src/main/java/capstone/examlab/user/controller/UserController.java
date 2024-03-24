package capstone.examlab.user.controller;

import capstone.examlab.user.dto.LoginDto;
import capstone.examlab.user.dto.UserAddDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/login")
    public String login(@ModelAttribute("user") LoginDto loginDto) {
        return "users/loginForm";
    }
    @GetMapping("/add")
    public String add(@ModelAttribute("user") UserAddDto userAddDto) {
        return "users/addUserForm";
    }
}
