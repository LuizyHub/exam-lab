package capstone.examlab.valid;

import capstone.examlab.exams.repository.ExamRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


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
        return examRepository.existsById(examId);
    }
}