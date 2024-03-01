package capstone.examlab.questions.service;

import capstone.examlab.exams.dto.ExamList;
import capstone.examlab.questions.entity.QuestionEntity;

import java.util.List;

public interface QuestionsService {
    List<QuestionEntity> findByDriverLicenseQuestions(List<String> tags, int count, String includes);
}
