package capstone.examlab.exams.config;

import capstone.examlab.exams.domain.Exam;
import capstone.examlab.exams.domain.ExamDoc;
import capstone.examlab.exams.domain.ExamEntity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.Scope;

@Configuration
public class ExamConfig {

    @Bean
    @Profile("jpa")
    @Scope("prototype")
    public Exam examEntity() {
        return new ExamEntity();
    }

    @Bean
    @Profile("mongo")
    @Scope("prototype")
    public Exam examDoc() {
        return new ExamDoc();
    }

}
