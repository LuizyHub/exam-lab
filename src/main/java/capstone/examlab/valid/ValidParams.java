package capstone.examlab.valid;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ParmasValidator.class)
public @interface ValidParams {
    String message() default "Invalid params";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}