package capstone.examlab.questions.service;

import capstone.examlab.exams.service.ExamsService;
import capstone.examlab.exhandler.exception.NotFoundQuestionException;
import capstone.examlab.exhandler.exception.UnauthorizedException;
import capstone.examlab.image.service.ImageService;
import capstone.examlab.questions.dto.*;
import capstone.examlab.questions.dto.search.QuestionsSearchDto;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import capstone.examlab.questions.entity.QuestionEntity;
import capstone.examlab.questions.repository.BoolQueryBuilder;
import capstone.examlab.questions.repository.QuestionsRepository;
import capstone.examlab.users.domain.User;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
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
    private final ExamsService examsService;
    private final BoolQueryBuilder boolQueryBuilder;
    private final ElasticsearchTemplate elasticsearchTemplate;

    //AI 문제 Create 로직
    public QuestionsListDto addAIQuestionsByExamId(Long examId, List<QuestionUpdateDto> questionsUpdateListDto){
        List<QuestionDto> questionsList = new ArrayList<>();
        for (QuestionUpdateDto questionUpdateDto : questionsUpdateListDto) {
            String uuid = UUID.randomUUID().toString();
            QuestionEntity question = QuestionEntity.builder()
                    .id(uuid)
                    .examId(examId)
                    .type("객관식")
                    .question(questionUpdateDto.getQuestion())
                    .options(questionUpdateDto.getOptions())
                    .questionImagesIn(new ArrayList<>())
                    .questionImagesOut(new ArrayList<>())
                    .answers(questionUpdateDto.getAnswers())
                    .commentary(questionUpdateDto.getCommentary())
                    .commentaryImagesIn(new ArrayList<>())
                    .commentaryImagesOut(new ArrayList<>())
                    .tagsMap(questionUpdateDto.getTags())
                    .build();
            questionsRepository.save(question);
            Optional<QuestionEntity> questionEntity = questionsRepository.findById(uuid);
            if(questionEntity.isPresent()){
                QuestionDto questionDto = questionEntity.get().toDto();
                questionsList.add(questionDto);
            }
            else throw new NotFoundQuestionException();
        }
        return new QuestionsListDto(questionsList);
    }

    //Create 로직
    @Override
    public String addQuestionsByExamId(User user, Long examId, QuestionUploadInfo questionUploadInfo, List<MultipartFile> questionImagesIn, List<MultipartFile> questionImagesOut, List<MultipartFile> commentaryImagesIn, List<MultipartFile> commentaryImagesOut) {
        //문제 생성 권한이 있는 유저 체크
        if(!examsService.isExamOwner(examId,user)){
            throw new UnauthorizedException();
        }

        if (questionImagesIn != null) {
            for (int i = 0; i < questionImagesIn.size(); i++) {
                String imageUrl = imageService.saveImageInS3(questionImagesIn.get(i));
                questionUploadInfo.getQuestionImagesTextIn().get(i).setUrl(imageUrl);
            }
        }
        if (questionImagesOut != null) {
            for (int i = 0; i < questionImagesOut.size(); i++) {
                String imageUrl = imageService.saveImageInS3(questionImagesOut.get(i));
                questionUploadInfo.getQuestionImagesTextOut().get(i).setUrl(imageUrl);
            }
        }
        if (commentaryImagesIn != null) {
            for (int i = 0; i < commentaryImagesIn.size(); i++) {
                String imageUrl = imageService.saveImageInS3(commentaryImagesIn.get(i));
                questionUploadInfo.getCommentaryImagesTextIn().get(i).setUrl(imageUrl);
            }
        }
        if (commentaryImagesOut != null) {
            for (int i = 0; i < commentaryImagesOut.size(); i++) {
                String imageUrl = imageService.saveImageInS3(commentaryImagesOut.get(i));
                questionUploadInfo.getCommentaryImagesTextOut().get(i).setUrl(imageUrl);
            }
        }

        if (questionUploadInfo.getQuestionImagesTextIn() == null) {
            questionUploadInfo.setQuestionImagesTextIn(new ArrayList<>());
        }
        if (questionUploadInfo.getQuestionImagesTextOut() == null) {
            questionUploadInfo.setQuestionImagesTextOut(new ArrayList<>());
        }
        if (questionUploadInfo.getCommentaryImagesTextIn() == null) {
            questionUploadInfo.setCommentaryImagesTextIn(new ArrayList<>());
        }
        if (questionUploadInfo.getCommentaryImagesTextOut() == null) {
            questionUploadInfo.setCommentaryImagesTextOut(new ArrayList<>());
        }
        if (questionUploadInfo.getTags() == null) {
            questionUploadInfo.setTags(new HashMap<>());
        }

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
                .tagsMap(questionUploadInfo.getTags())
                .build();
        return questionsRepository.save(question).getId();
    }

    //Read 로직
    @Override
    public QuestionsListDto searchFromQuestions(Long examId, QuestionsSearchDto questionsSearchDto) {
        List<QuestionDto> questionsList = new ArrayList<>();
        int count = 0;
        //전체 조회
        if(questionsSearchDto.getCount() == 0){
            List<QuestionEntity> questionEntities = questionsRepository.findByExamId(examId);
            if(questionEntities.isEmpty()) return new QuestionsListDto(questionsList);
            for (QuestionEntity entity : questionEntities) {
                QuestionDto questionDto = makeQuestionEntityToQuestionDTO(entity);
                questionsList.add(questionDto);
            }
            return new QuestionsListDto(questionsList);
        }
        else{
            Query query = boolQueryBuilder.searchQuestionsQuery(examId, questionsSearchDto);
            //쿼리문 코드 적용 및 elasticSearch 통신 관련
            NativeQuery searchQuery = new NativeQuery(query);
            searchQuery.setPageable(PageRequest.of(0, questionsSearchDto.getCount()));
            SearchHits<QuestionEntity> searchHits = elasticsearchTemplate.search(searchQuery, QuestionEntity.class);

            for (SearchHit<QuestionEntity> hit : searchHits) {
                if (count >= questionsSearchDto.getCount()) {
                    break;
                }
                QuestionEntity entity = hit.getContent();
                QuestionDto questionDto = makeQuestionEntityToQuestionDTO(entity);
                questionsList.add(questionDto);
                count++;
            }
            return new QuestionsListDto(questionsList);
        }
    }

    private QuestionDto makeQuestionEntityToQuestionDTO(QuestionEntity questionEntity){
        return QuestionDto.builder()
                .id(questionEntity.getId())
                .type(questionEntity.getType())
                .question(questionEntity.getQuestion())
                .questionImagesIn(new ArrayList<>(questionEntity.getQuestionImagesIn()))
                .questionImagesOut(new ArrayList<>(questionEntity.getQuestionImagesOut()))
                .options(new ArrayList<>(questionEntity.getOptions()))
                .answers(new ArrayList<>(questionEntity.getAnswers()))
                .commentary(questionEntity.getCommentary())
                .commentaryImagesIn(new ArrayList<>(questionEntity.getCommentaryImagesIn()))
                .commentaryImagesOut(new ArrayList<>(questionEntity.getCommentaryImagesOut()))
                .tags(new HashMap<>(questionEntity.getTagsMap()))
                .build();
    }

    //Update 로직
    @Override
    public boolean updateQuestionsByQuestionId(User user, QuestionUpdateDto questionUpdateDto) {
        //Optional 통한 데이터 존재 검증
        Optional<QuestionEntity> optionalQuestion = questionsRepository.findById(questionUpdateDto.getId());
        if (optionalQuestion.isPresent()) {
            QuestionEntity question = optionalQuestion.get();
            //문제 수정 권한이 있는 유저 체크
            if (!examsService.isExamOwner(question.getExamId(), user)) {
                throw new UnauthorizedException();
            }
            question.setQuestion(questionUpdateDto.getQuestion());
            question.setOptions(questionUpdateDto.getOptions());
            question.setAnswers(questionUpdateDto.getAnswers());
            question.setCommentary(questionUpdateDto.getCommentary());
            question.setTagsMap(questionUpdateDto.getTags());
            questionsRepository.save(question);
            return true;
        } else {
            return false;
        }
    }

    //Delete 로직
    @Override
    public boolean deleteQuestionsByExamId(Long examId) {
        questionsRepository.deleteByExamId(examId);

        List<QuestionEntity> questions = questionsRepository.findByExamId(examId);

        return questions.isEmpty();
    }

    @Override
    public boolean deleteQuestionsByQuestionId(User user, String questionId) {
        Optional<QuestionEntity> optionalQuestion = questionsRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            QuestionEntity question = optionalQuestion.get();
            //문제 수정 권한이 있는 유저 체크
            if (!examsService.isExamOwner(question.getExamId(), user)) {
                throw new UnauthorizedException();
            }
            questionsRepository.deleteById(questionId);
        } else {
            return false;
        }
        //삭제 검증
        return !questionsRepository.existsById(questionId);
    }


}
