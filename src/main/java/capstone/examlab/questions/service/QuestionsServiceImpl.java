package capstone.examlab.questions.service;

import capstone.examlab.image.service.ImageService;
import capstone.examlab.questions.dto.*;
import capstone.examlab.questions.dto.search.QuestionsSearch;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
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
    private final BoolQueryBuilder boolQueryBuilder;
    private final ElasticsearchTemplate elasticsearchTemplate;

    //Create 로직
    @Override
    public boolean addQuestionsByExamId(Long examId, QuestionUploadInfo questionUploadInfo, List<MultipartFile> questionImagesIn, List<MultipartFile> questionImagesOut, List<MultipartFile> commentaryImagesIn, List<MultipartFile> commentaryImagesOut) {
        log.info(questionUploadInfo.toString());
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
        questionsRepository.save(question);
        return questionsRepository.existsById(uuid);
    }

    //Read 로직
    @Override
    public QuestionsListDto searchFromQuestions(Long examId, QuestionsSearch questionsSearch) {
        Query query = boolQueryBuilder.searchQuestionsQuery(examId, questionsSearch);

        log.info("QuestionsSearch: " + questionsSearch.toString());
        //쿼리문 코드 적용 및 elasticSearch 통신 관련
        NativeQuery searchQuery = new NativeQuery(query);
        searchQuery.setPageable(PageRequest.of(0, questionsSearch.getCount()));
        SearchHits<QuestionEntity> searchHits = elasticsearchTemplate.search(searchQuery, QuestionEntity.class);

        List<QuestionDto> questionsList = new ArrayList<>();
        int count = 0;
        for (SearchHit<QuestionEntity> hit : searchHits) {
            if (count >= questionsSearch.getCount()) {
                break;
            }
            QuestionEntity entity = hit.getContent();
            QuestionDto questionDto = QuestionDto.builder()
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
                    .tags(new HashMap<>(entity.getTagsMap()))
                    .build();
            questionsList.add(questionDto);
            count++;
        }
        log.info("searchSize: " + questionsList.size());

        return new QuestionsListDto(questionsList);
    }

    //Update 로직
    @Override
    public boolean updateQuestionsByQuestionId(QuestionUpdateDto questionUpdateDto) {
        //Optional 통한 데이터 존재 검증
        Optional<QuestionEntity> optionalQuestion = questionsRepository.findById(questionUpdateDto.getId());
        if (optionalQuestion.isPresent()) {
            QuestionEntity question = optionalQuestion.get();
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

        // 삭제 검증
        return questions.isEmpty();
    }

    @Override
    public boolean deleteQuestionsByQuestionId(String questionId) {
        questionsRepository.deleteById(questionId);

        //삭제 검증
        return !questionsRepository.existsById(questionId);
    }
}
