package capstone.examlab.questions.service;

import capstone.examlab.exams.dto.Question;
import capstone.examlab.exams.dto.QuestionsList;
import capstone.examlab.exams.dto.QuestionsOption;
import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.repository.DriverLicenseQuestionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionsService {
    private final DriverLicenseQuestionsRepository driverLicenseQuestionsRepository;

    @Override
    public QuestionsList findByDriverLicenseQuestions(QuestionsOption questionsOption) {
        //default 10설정
        Pageable pageable = PageRequest.of(0, questionsOption.getCount());
        Page<QuestionEntity> quizPage;
        if(questionsOption.getTags()==null&questionsOption.getIncludes()==null){
            quizPage = driverLicenseQuestionsRepository.findAll(pageable);
        }
        else if(questionsOption.getTags()==null){
            quizPage = driverLicenseQuestionsRepository.findByQuestionContainingOrOptionsContaining(questionsOption.getIncludes(), questionsOption.getIncludes(), pageable);
        }
        else if(questionsOption.getIncludes()==null) {
            quizPage = driverLicenseQuestionsRepository.findByTagsIn(questionsOption.getTags(), pageable);
        }
        else {
            quizPage = driverLicenseQuestionsRepository.findByTagsInAndQuestionContainingOrOptionsContaining(questionsOption.getTags(), questionsOption.getIncludes(), questionsOption.getIncludes(), pageable);
        }

        QuestionsList questionsList = new QuestionsList();
        for (QuestionEntity entity : quizPage) {
            Question question = new Question();
            question.setId(entity.getId());
            question.setType(entity.getType());
            question.setQuestion(entity.getQuestion());
            question.setQuestionImageUrls(new ArrayList<>(entity.getQuestionImageUrls()));
            question.setQuestionImageDescriptions(new ArrayList<>(entity.getQuestionImageDescriptions()));
            question.setOptions(new ArrayList<>(entity.getOptions()));
            question.setAnswers(new ArrayList<>(entity.getAnswers()));
            question.setCommentary(entity.getCommentary());
            question.setCommentaryImageUrls(new ArrayList<>(entity.getCommentaryImageUrls()));
            question.setCommentaryImageDescriptions(new ArrayList<>(entity.getCommentaryImageDescriptions()));
            question.setTags(new ArrayList<>(entity.getTags()));
            questionsList.add(question);
        }
        return questionsList;
    }
}
