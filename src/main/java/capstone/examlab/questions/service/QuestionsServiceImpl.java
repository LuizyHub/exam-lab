package capstone.examlab.questions.service;

import capstone.examlab.exhandler.exception.NotFoundQuestionException;
import capstone.examlab.image.service.ImageService;
import capstone.examlab.questions.dto.*;
import capstone.examlab.questions.dto.search.QuestionsSearchDto;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import capstone.examlab.questions.documnet.Question;
import capstone.examlab.questions.repository.BoolQueryBuilder;
import capstone.examlab.questions.repository.QuestionsRepository;
import capstone.examlab.users.domain.User;
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

    //AI 문제 Create 로직
    public QuestionsListDto addAIQuestionsByExamId(Long examId, List<QuestionUpdateDto> questionsUpdateListDto) {
        List<QuestionDto> questionsList = new ArrayList<>();
        for (QuestionUpdateDto questionUpdateDto : questionsUpdateListDto) {
            String questionType = "객관식";
            Question question = questionUpdateDto.toDocument(examId, questionType);
            String uuid = questionsRepository.save(question).getId();
            //생성 및 조회 검증
            Optional<Question> createdQuestion = questionsRepository.findById(uuid);
            if (createdQuestion.isPresent()) {
                questionsList.add(QuestionDto.fromDocument(createdQuestion.get()));
            } else {
                throw new NotFoundQuestionException();
            }
        }
        return new QuestionsListDto(questionsList);
    }

    //Create 로직
    @Override
    public QuestionDto addQuestionsByExamId(User user, Long examId, QuestionUploadInfo questionUploadInfo, List<MultipartFile> questionImagesIn, List<MultipartFile> questionImagesOut, List<MultipartFile> commentaryImagesIn, List<MultipartFile> commentaryImagesOut) {
        questionUploadInfo.initializeCollections();
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

        Question question = questionUploadInfo.toDocument(examId);
        String uuid = questionsRepository.save(question).getId();
        Optional<Question> createdQuestion = questionsRepository.findById(uuid);
        if (createdQuestion.isPresent()) {
            return QuestionDto.fromDocument(createdQuestion.get());
        } else {
            throw new NotFoundQuestionException();
        }
    }

    //Read 로직
    @Override
    public QuestionsListDto searchFromQuestions(Long examId, QuestionsSearchDto questionsSearchDto) {
        List<QuestionDto> questionsList = new ArrayList<>();
        int count = 0;
        //전체 조회
        if (questionsSearchDto.getCount() == 0) {
            List<Question> questionEntities = questionsRepository.findByExamId(examId);
            if (questionEntities.isEmpty()) return new QuestionsListDto(questionsList);
            for (Question question : questionEntities) {
                questionsList.add(QuestionDto.fromDocument(question));
            }
            return new QuestionsListDto(questionsList);
        } else { //일부 조회
            Query query = boolQueryBuilder.searchQuestionsQuery(examId, questionsSearchDto);
            //쿼리문 코드 적용 및 elasticSearch 통신 관련
            NativeQuery searchQuery = new NativeQuery(query);
            searchQuery.setPageable(PageRequest.of(0, questionsSearchDto.getCount()));
            SearchHits<Question> searchHits = elasticsearchTemplate.search(searchQuery, Question.class);

            for (SearchHit<Question> hit : searchHits) {
                if (count >= questionsSearchDto.getCount()) {
                    break;
                }
                Question question = hit.getContent();
                questionsList.add(QuestionDto.fromDocument(question));
                count++;
            }
            return new QuestionsListDto(questionsList);
        }
    }

    @Override
    public Long getExamIDFromQuestion(String questionId) {
        Optional<Question> optionalQuestion = questionsRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            return question.getExamId();
        } else {
            throw new NotFoundQuestionException();
        }
    }

    //Update 로직
    @Override
    public boolean updateQuestionsByQuestionId(User user, QuestionUpdateDto questionUpdateDto) {
        //Optional 통한 데이터 존재 검증
        Optional<Question> optionalQuestion = questionsRepository.findById(questionUpdateDto.getId());
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            questionsRepository.save(questionUpdateDto.updateDocument(question));
            return true;
        } else {
            return false;
        }
    }

    //Delete 로직
    @Override
    public void deleteQuestionsByExamId(Long examId) {
        questionsRepository.deleteByExamId(examId);
    }

    @Override
    public void deleteQuestionsByQuestionId(User user, String questionId) {questionsRepository.deleteById(questionId);}
}
