package capstone.examlab.questions.service;

import capstone.examlab.image.service.ImageService;
import capstone.examlab.questions.dto.ImageSave;
import capstone.examlab.questions.dto.upload.QuestionUpload;
import capstone.examlab.questions.dto.upload.QuestionsUpload;
import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.repository.questionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionsServiceImpl implements QuestionsService {
    private final questionsRepository questionsRepository;
    private final ImageService imageService;
    //Create 로직
    @Override
    public void addQuestionsByExamId(Long examId, QuestionsUpload questionsUploadDto) {
        List<QuestionEntity> questionEntities = new ArrayList<>();
        if(questionsUploadDto != null) {
            for (QuestionUpload question  : questionsUploadDto) {
                QuestionEntity questionEntity = QuestionEntity.builder()
                        .id(question.getUuid())
                        .examId(examId)
                        .type(question.getType())
                        .question(question.getQuestion())
                        .options(question.getOptions())
                        .questionImagesIn(new ArrayList<>())
                        .questionImagesOut(new ArrayList<>())
                        .answers(question.getAnswers())
                        .commentary(question.getCommentary())
                        .commentaryImagesIn(new ArrayList<>())
                        .commentaryImagesOut(new ArrayList<>())
                        .tagsMap(question.getTagsMap())
                        .build();

                questionEntities.add(questionEntity);
            }
            questionsRepository.saveAll(questionEntities);
        }
    }

    //Image관련 Service로직은 ImageService에 위임 - 추후 문제 데이터 추가시에 내용도 추가됨에 따라 QuestionsService 로직이 담당하는 부분이 많을 것으로 예상 -> 분산필요
    @Override
    public List<String> saveImages(ImageSave imageSave){
        if (imageSave.getImages() == null) return null;
        return imageService.saveImagesInS3(imageSave);
    }

    @Override
    public void deleteImages(String imageName){
        imageService.deleteImageInFolder(imageName);
    }
}
