package capstone.examlab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class ExamLabApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExamLabApplication.class, args);
	}

	@Controller
	public static class WelcomeController {

		@GetMapping("/api/v1/")
		public String redirectToIndexHtml() {
			return "forward:/api/v1/index.html";
		}
	}
}
