package capstone.examlab.valid;

import capstone.examlab.exams.repository.ExamRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExamIdValidator implements ConstraintValidator<ValidExamId, Long> {

    private final ExamRepository examRepository;

    @Override
    public void initialize(ValidExamId constraintAnnotation) {
    }

    @Override
    public boolean isValid(Long examId, ConstraintValidatorContext context) {
        if (examId == null) {
            return false;
        }
        boolean exists = examRepository.existsById(examId);
        log.info("examId={}, exists={}", examId, exists);
        return examRepository.existsById(examId);
    }
}