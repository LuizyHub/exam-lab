package capstone.examlab.questions.service;

import capstone.examlab.image.dto.ImagesUploadInfo;
import capstone.examlab.image.service.ImageService;
import capstone.examlab.questions.dto.*;
import capstone.examlab.questions.dto.upload.QuestionUpload;
import capstone.examlab.questions.dto.upload.QuestionsUpload;
import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.repository.BoolQueryBuilder;
import capstone.examlab.questions.repository.QuestionsRepository;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionsServiceImpl implements QuestionsService {
    private final QuestionsRepository questionsRepository;
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

    @Override
    public boolean addImageInQuestions(ImagesUploadInfo imagesUploadInfo) {
        int size = imagesUploadInfo.getImageFiles().size();
        int uuidSize = imagesUploadInfo.getQuestionsUuid().size();
        int descriptionSize = imagesUploadInfo.getDescriptions().size();
        int attributeSize = imagesUploadInfo.getAttributes().size();
        int imageTypeSize = imagesUploadInfo.getImagesType().size();
        if(size == 0) return false;

        String beforeUuid = "";
        int questionImagesInCount = 0;
        int questionImagesOutCount = 0;
        int commentaryImagesInCount = 0;
        int commentaryImagesOutCount = 0;

        for (int i = 0; i < size; i++) {
            //이미지 넣는 로직
            MultipartFile imageFile = imagesUploadInfo.getImageFiles().get(i);
            String uuid = "";
            if(uuidSize>i) uuid = imagesUploadInfo.getQuestionsUuid().get(i);
            String imageDescription = "";
            if(descriptionSize>i) imageDescription = imagesUploadInfo.getDescriptions().get(i);
            String imageAttribute = "";
            if(attributeSize>i) imageAttribute = imagesUploadInfo.getAttributes().get(i);
            String imageType = "";
            if(imageTypeSize>i) imageType = String.valueOf(imagesUploadInfo.getImagesType().get(i));

            if(!beforeUuid.equals(uuid)){
                beforeUuid = uuid;
                questionImagesInCount = 0;
                questionImagesOutCount = 0;
                commentaryImagesInCount = 0;
                commentaryImagesOutCount = 0;
            }

            Optional<QuestionEntity> optionalQuestion = questionsRepository.findById(uuid);
            String imageUrl ="";
            ImageDto imageDto;
            switch (imageType) {
                case "questionImagesIn":
                    questionImagesInCount++;
                    imageUrl = imageService.saveImageInS3(imageFile, questionImagesInCount);
                    log.info("imageUrl: "+imageUrl);
                    imageDto = ImageDto.builder()
                            .url(imageUrl)
                            .description(imageDescription)
                            .attribute(imageAttribute)
                            .build();
                    optionalQuestion.ifPresent(question -> {
                        question.getQuestionImagesIn().add(imageDto);
                        questionsRepository.save(question); // 수정된 질문 저장
                    });
                    break;
                case "questionImagesOut":
                    questionImagesOutCount++;
                    imageUrl = imageService.saveImageInS3(imageFile, questionImagesOutCount);
                    imageDto = ImageDto.builder()
                            .url(imageUrl)
                            .description(imageDescription)
                            .attribute(imageAttribute)
                            .build();
                    optionalQuestion.ifPresent(question -> {
                        question.getQuestionImagesOut().add(imageDto);
                        questionsRepository.save(question); // 수정된 질문 저장
                    });
                    break;
                case "commentaryImagesIn":
                    commentaryImagesInCount++;
                    imageUrl = imageService.saveImageInS3(imageFile, commentaryImagesInCount);
                    imageDto = ImageDto.builder()
                            .url(imageUrl)
                            .description(imageDescription)
                            .attribute(imageAttribute)
                            .build();
                    optionalQuestion.ifPresent(question -> {
                        question.getCommentaryImagesIn().add(imageDto);
                        questionsRepository.save(question); // 수정된 질문 저장
                    });
                    break;
                case "commentaryImagesOut":
                    commentaryImagesOutCount++;
                    imageUrl = imageService.saveImageInS3(imageFile, commentaryImagesOutCount);
                    imageDto = ImageDto.builder()
                            .url(imageUrl)
                            .description(imageDescription)
                            .attribute(imageAttribute)
                            .build();
                    optionalQuestion.ifPresent(question -> {
                        question.getCommentaryImagesOut().add(imageDto);
                        questionsRepository.save(question); // 수정된 질문 저장
                    });
                    break;
                default:
                    return false;
            }
        }
        return true;
    }

}
