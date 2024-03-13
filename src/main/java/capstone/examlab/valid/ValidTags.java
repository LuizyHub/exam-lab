package capstone.examlab.valid;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import org.springframework.stereotype.Component;

import java.lang.annotation.*;

@Component
@Constraint(validatedBy = TagsValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidTags {
    String message() default "Invalid tags";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}