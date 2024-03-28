package capstone.examlab.questions.service;

import capstone.examlab.image.dto.ImagesUploadInfo;
import capstone.examlab.image.service.ImageService;
import capstone.examlab.questions.dto.*;
import capstone.examlab.questions.dto.search.QuestionsSearch;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import capstone.examlab.questions.dto.update.QuestionsUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUpload;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import capstone.examlab.questions.dto.upload.QuestionsUpload;
import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.repository.BoolQueryBuilder;
import capstone.examlab.questions.repository.QuestionsRepository;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
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
    private final BoolQueryBuilder boolQueryBuilder;
    private final ElasticsearchTemplate elasticsearchTemplate;

    //Create 로직
    @Override
    public boolean addQuestionsByExamId(Long examId, QuestionUploadInfo questionUploadInfo, List<MultipartFile> questionImagesIn, List<MultipartFile> questionImagesOut, List<MultipartFile> commentaryImagesIn, List<MultipartFile> commentaryImagesOut ){
        log.info(questionUploadInfo.toString());
        for (int i = 0; i <questionImagesIn.size() ; i++) {
            String imageUrl = imageService.saveImageInS3(questionImagesIn.get(i));
            questionUploadInfo.getQuestionImagesTextIn().get(i).setUrl(imageUrl);
        }
        for (int i = 0; i <questionImagesOut.size() ; i++) {
            String imageUrl = imageService.saveImageInS3(questionImagesOut.get(i));
            questionUploadInfo.getQuestionImagesTextOut().get(i).setUrl(imageUrl);
        }
        for (int i = 0; i <commentaryImagesIn.size() ; i++) {
            String imageUrl = imageService.saveImageInS3(commentaryImagesIn.get(i));
            questionUploadInfo.getCommentaryImagesTextIn().get(i).setUrl(imageUrl);
        }
        for (int i = 0; i <commentaryImagesOut.size() ; i++) {
            String imageUrl = imageService.saveImageInS3(commentaryImagesOut.get(i));
            questionUploadInfo.getCommentaryImagesTextOut().get(i).setUrl(imageUrl);
        }
        //uuid랑 examid처리 해서 데이터 넣어주기
        String uuid = UUID.randomUUID().toString();
        QuestionEntity question = QuestionEntity.builder()
                .id(uuid)
                .examId(examId)
                .type(questionUploadInfo.getType())
                .question(questionUploadInfo.getQuestion())
                .options(questionUploadInfo.getOptions())
                .questionImagesIn(questionUploadInfo.getQuestionImagesTextIn())
                .questionImagesOut(questionUploadInfo.getQuestionImagesTextOut())
                .answers(questionUploadInfo.getAnswers())
                .commentary(questionUploadInfo.getCommentary())
                .commentaryImagesIn(questionUploadInfo.getCommentaryImagesTextIn())
                .commentaryImagesOut(questionUploadInfo.getCommentaryImagesTextOut())
                .tagsMap(questionUploadInfo.getTagsMap())
                .build();
        questionsRepository.save(question);
        return questionsRepository.existsById(uuid);
    }
 /*   @Override
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
    }*/

    //Read 로직
    @Override
    public QuestionsList searchFromQuestions(Long examId, QuestionsSearch questionsSearch) {
        Query query = boolQueryBuilder.searchQuestionsQuery(examId, questionsSearch);

        //쿼리문 코드 적용 및 elasticSearch 통신 관련 코드
        NativeQuery searchQuery = new NativeQuery(query);
        searchQuery.setPageable(PageRequest.of(0, questionsSearch.getCount()));
        SearchHits<QuestionEntity> searchHits = elasticsearchTemplate.search(searchQuery, QuestionEntity.class);

        QuestionsList questionsList = new QuestionsList();
        int count = 0;
        for (SearchHit<QuestionEntity> hit : searchHits) {
            if (count >= questionsSearch.getCount()) {
                break; // 요청된 개수 이상의 결과가 나왔을 경우 종료
            }
            QuestionEntity entity = hit.getContent();
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
                    .tagsMap(new HashMap<>(entity.getTagsMap()))
                    .build();
            questionsList.add(question);
            count++;
        }
        return questionsList;
    }

    //Update 로직
    @Override
    public boolean updateQuestionsByUUID(QuestionsUpdateDto questionsUpdateDto) {
        int size = questionsUpdateDto.size();
        if(size == 0) return false;
        for (QuestionUpdateDto questionUpdateDto : questionsUpdateDto) {
            Optional<QuestionEntity> optionalQuestion = questionsRepository.findById(questionUpdateDto.getId());
            optionalQuestion.ifPresent(question -> {
                question.setQuestion(questionUpdateDto.getQuestion());
                question.setOptions(questionUpdateDto.getOptions());
                question.setAnswers(questionUpdateDto.getAnswers());
                question.setCommentary(questionUpdateDto.getCommentary());
                question.setTagsMap(questionUpdateDto.getTagsMap());
                questionsRepository.save(question);
            });
        }
        return true;
    }

    //Delete 로직
    @Override
    public boolean deleteQuestionsByExamId(Long examId) {
        // 해당 examId로 문제 삭제
        questionsRepository.deleteByExamId(examId);

        List<QuestionEntity> questions = questionsRepository.findByExamId(examId);

        // 삭제 후에 해당 examId로 조회된 데이터의 개수를 확인하여 반환
        return questions.isEmpty();
    }

    @Override
    public boolean deleteQuestionsByUuidList(List<String> uuidList) {
        // 각각의 UUID에 대해 문제를 삭제
        for (String uuid : uuidList) {
            questionsRepository.deleteById(uuid);
        }

        // 삭제 후에 해당 UUID로 조회된 데이터의 개수를 확인하여 반환
        for (String uuid : uuidList) {
            if (questionsRepository.existsById(uuid)) {
                return false; // 문제가 남아있음을 표시
            }
        }
        return true;
    }
}
