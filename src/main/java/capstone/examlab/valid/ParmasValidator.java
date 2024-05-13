package capstone.examlab.valid;

import capstone.examlab.util.Util;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;

@Slf4j
public class ParmasValidator implements ConstraintValidator<ValidParams, MultiValueMap<String, String>> {

    @Override
    public void initialize(ValidParams constraintAnnotation) {
    }

    @Override
    public boolean isValid(MultiValueMap<String, String> params, ConstraintValidatorContext context) {
        if (params.isEmpty()) {
            return true;
        }
        for (String key : params.keySet()) {
            //key 검증
            if(key.contains("tags")){
                if(!Util.matchesTagsPattern(key)||key.length() > 20) {
                    return false;
                }
            }
            else{
                if(!key.equals("count")&&!key.equals("includes")){
                    return false;
                }
            }
            //value 검증
            for (String s: params.get(key)) {
                if (!Util.isSingleToken(s)||s.length() > 20) {
                    return false;
                }
            }
        }
        return true;
    }
}