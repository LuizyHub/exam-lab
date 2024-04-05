package capstone.examlab.valid;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.List;
import java.util.Map;

public class ParmasValidator implements ConstraintValidator<ValidParams, Map<String,String>> {

    @Override
    public void initialize(ValidParams constraintAnnotation) {
    }

    @Override
    public boolean isValid(Map<String, String> params, ConstraintValidatorContext context) {
        if (params == null) {
            return true;
        }
        for (String key : params.keySet()) {
            // @Pattern 검증
            if (!key.matches("^[a-zA-z가-힣0-9]+$")) {
                return false;
            }
            // @Size 검증
            if(key.length() > 20) {
                return false;
            }
        }
        for (String value : params.values()) {
            // @Pattern 검증
            if (!value.matches("^[a-zA-z가-힣0-9]+$")) {
                return false;
            }
            // @Size 검증
            if(value.length() > 20) {
                return false;
            }
        }
        return true;
    }
}