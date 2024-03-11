package capstone.examlab.valid;

import capstone.examlab.questions.dto.QuestionsOption;
import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.repository.DriverLicenseQuestionsRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuestionOptionValidator implements ConstraintValidator<ValidQuestionOption, QuestionsOption> {

    private final DriverLicenseQuestionsRepository driverLicenseQuestionsRepository;

    @Override
    public void initialize(ValidQuestionOption constraintAnnotation) {
    }

    public boolean isValid(QuestionsOption questionsOption, ConstraintValidatorContext context) {
        if(questionsOption.getCount()==null){
            return false;
        }

        try {
            if (questionsOption.getCount() <= 0) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("Not positive count").addConstraintViolation();
                return false;
            }

            Pageable pageable = PageRequest.of(0, questionsOption.getCount());
            Page<QuestionEntity> questionsPage;

            if (questionsOption.getTags() == null && questionsOption.getIncludes() == null) {
                questionsPage = driverLicenseQuestionsRepository.findAll(pageable);
            } else if (questionsOption.getTags() == null) {
                questionsPage = driverLicenseQuestionsRepository.findByQuestionContainingOrOptionsContaining(questionsOption.getIncludes(), questionsOption.getIncludes(), pageable);
            } else if (questionsOption.getIncludes() == null) {
                questionsPage = driverLicenseQuestionsRepository.findByTagsIn(questionsOption.getTags(), pageable);
            } else {
                questionsPage = driverLicenseQuestionsRepository.findByTagsInAndQuestionContainingOrOptionsContaining(questionsOption.getTags(), questionsOption.getIncludes(), questionsOption.getIncludes(), pageable);
            }

            if(questionsPage == null) return false;
            return questionsPage.getTotalElements() != 0;
        } catch (NumberFormatException e) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Invalid count").addConstraintViolation();
            return false;
        }
    }
}
