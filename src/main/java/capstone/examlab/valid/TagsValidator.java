package capstone.examlab.valid;

import capstone.examlab.questions.repository.questionsRepository;
import lombok.RequiredArgsConstructor;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.List;

@RequiredArgsConstructor
public class TagsValidator implements ConstraintValidator<ValidTags, List<String>> {

    private final questionsRepository questionsRepository;

    @Override
    public void initialize(ValidTags constraintAnnotation) {
    }

    @Override
    public boolean isValid(List<String> tags, ConstraintValidatorContext context) {
/*
        if (tags == null) {
            return true;
        }

        //파라미터로 받은 tag들이 저장소에 존재하는 tag인지 확인
        for (String tag : tags) {
            if (!questionsRepository.existsByTags(tag)) {
                return false;
            }
        }
*/

        return true;
    }
}