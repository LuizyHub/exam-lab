package capstone.examlab.valid;

import capstone.examlab.util.Util;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.MultiValueMap;

@Slf4j
public class ParmasValidator implements ConstraintValidator<ValidParams, MultiValueMap<String, String>> {
    private static final int MAX_SEARCH_PARAMETER_SIZE = 20;
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
                if(!Util.matchesTagsPattern(key)||key.length() > MAX_SEARCH_PARAMETER_SIZE) {
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
                if(s.length() > MAX_SEARCH_PARAMETER_SIZE){
                    return false;
                }
                else if(key.equals("count")&&Integer.parseInt(s)>10000){
                    return false;
                } else if(key.equals("includes")){
                    String[] words = s.split(" ");
                    for (String word : words) {
                        if (!Util.isSingleToken(word)) {
                            return false;
                        }
                    }
                } else if(key.contains("tags")&&!Util.matchesTagsValuePattern(s)) {
                    return false;
                }
            }
        }
        return true;
    }
}