package capstone.examlab.valid;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ExamIdValidator.class)
public @interface ValidExamId {
    String message() default "Invalid Exam ID";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}