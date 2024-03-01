package capstone.examlab.questions.service;

import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.repository.DriverLicenseQuestionsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionsService {
    private final DriverLicenseQuestionsRepository driverLicenseQuestionsRepository;

    public QuestionServiceImpl(DriverLicenseQuestionsRepository driverLicenseQuestionsRepository){
        this.driverLicenseQuestionsRepository = driverLicenseQuestionsRepository;
    }

    @Override
    public List<QuestionEntity> findByDriverLicenseQuestions(List<String> tags, int count, String includes) {
        //정렬 또는 랜덤 적용 필요시 PageRequest.of 수정
        Pageable pageable = PageRequest.of(0, count);
        Page<QuestionEntity> quizPage;
        if(tags.isEmpty()&includes.equals("")){
            quizPage = driverLicenseQuestionsRepository.findAll(pageable);
            System.out.println("1번 작동");
        }
        else if(tags.isEmpty()){
            quizPage = driverLicenseQuestionsRepository.findByQuestionContainingOrOptionsContaining(includes, includes, pageable);
            System.out.println("2번 작동");
        }
        else if(includes.equals("")) {
            quizPage = driverLicenseQuestionsRepository.findByTagsIn(tags, pageable);
            System.out.println("3번작동");
        }
        else {
            quizPage = driverLicenseQuestionsRepository.findByTagsInAndQuestionContainingOrOptionsContaining(tags, includes, includes, pageable);
            System.out.println("4번 작동");
        }

        return quizPage.getContent();
    }
}
