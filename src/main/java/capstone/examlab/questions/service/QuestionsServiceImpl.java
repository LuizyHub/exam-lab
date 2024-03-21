package capstone.examlab.questions.service;

import capstone.examlab.questions.dto.ImageSaveDto;
import capstone.examlab.questions.dto.Question;
import capstone.examlab.questions.dto.QuestionsList;
import capstone.examlab.questions.dto.QuestionsOption;
import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.repository.DriverLicenseQuestionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionsServiceImpl implements QuestionsService {
    private final DriverLicenseQuestionsRepository driverLicenseQuestionsRepository;
    private final ImageService imageService;

    @Override
    public QuestionsList findByDriverLicenseQuestions(Long examId, QuestionsOption questionsOption) {
        Pageable pageable = PageRequest.of(0, questionsOption.getCount());
        Page<QuestionEntity> questionsPage;
        if(questionsOption.getTags()==null&questionsOption.getIncludes()==null){
            questionsPage = driverLicenseQuestionsRepository.findAll(pageable);
        }
        else if(questionsOption.getTags()==null){
            questionsPage = driverLicenseQuestionsRepository.findByQuestionContainingOrOptionsContaining(questionsOption.getIncludes(), questionsOption.getIncludes(), pageable);
        }
        else if(questionsOption.getIncludes()==null) {
            questionsPage = driverLicenseQuestionsRepository.findByTagsIn(questionsOption.getTags(), pageable);
        }
        else {
            questionsPage = driverLicenseQuestionsRepository.findByTagsInAndQuestionContainingOrOptionsContaining(questionsOption.getTags(), questionsOption.getIncludes(), questionsOption.getIncludes(), pageable);
        }

        QuestionsList questionsList = new QuestionsList();
        for (QuestionEntity entity : questionsPage) {
            Question question = Question.builder()
                    .id(entity.getId())
                    .type(entity.getType())
                    .question(entity.getQuestion())
                    .questionImagesIn(new ArrayList<>(entity.getQuestionImagesIn()))
                    .questionImagesOut(new ArrayList<>(entity.getQuestionImagesOut()))
                    .options(new ArrayList<>(entity.getOptions()))
                    .answers(new ArrayList<>(entity.getAnswers()))
                    .commentary(entity.getCommentary())
                    .commentaryImagesIn(new ArrayList<>(entity.getCommentaryImagesIn()))
                    .commentaryImagesOut(new ArrayList<>(entity.getCommentaryImagesOut()))
                    .tags(new ArrayList<>(entity.getTags()))
                    .build();
            questionsList.add(question);
        }
        return questionsList;
    }

    //Image관련 Service로직은 ImageService에 위임 - 추후 문제 데이터 추가시에 내용도 추가됨에 따라 QuestionsService 로직이 담당하는 부분이 많을 것으로 예상 -> 분산필요
    @Override
    public List<String> saveImages(ImageSaveDto imageSaveDto){
        if (imageSaveDto.getImages() == null) return null;
        return imageService.saveImagesInS3(imageSaveDto);
    }

    @Override
    public void deleteImages(String imageName){
        imageService.deleteImageInFolder(imageName);
    }
}
