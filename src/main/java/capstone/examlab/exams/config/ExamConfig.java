package capstone.examlab.exams.config;

import capstone.examlab.config.ProfileJPA;
import capstone.examlab.exams.domain.Exam;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class ExamConfig {

    @Bean
    @ProfileJPA
    @Scope("prototype")
    public Exam exam() {
        return new Exam();
    }

}
