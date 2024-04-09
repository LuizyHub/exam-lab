package capstone.examlab.questions.controller;

import capstone.examlab.questions.dto.QuestionsListDto;
import capstone.examlab.questions.dto.search.QuestionsSearch;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import capstone.examlab.questions.service.QuestionsService;
import capstone.examlab.valid.ValidExamId;
import capstone.examlab.valid.ValidParams;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/")
public class QuestionsController {
    private final QuestionsService questionsService;

    //Create API
    @PostMapping("exams/{examId}/questions")
    public void addQuestionsByExamId(@PathVariable @ValidExamId Long examId, @RequestPart QuestionUploadInfo questionUploadInfo, @RequestPart(name = "questionImagesIn", required = false) List<MultipartFile> questionImagesIn,
                                                       @RequestPart(name = "questionImagesOut", required = false) List<MultipartFile> questionImagesOut, @RequestPart(name = "commentaryImagesIn", required = false) List<MultipartFile> commentaryImagesIn,
                                                       @RequestPart(name = "commentaryImagesOut", required = false) List<MultipartFile> commentaryImagesOut, HttpServletResponse response)  {
        try {
            boolean saved = questionsService.addQuestionsByExamId(examId, questionUploadInfo, questionImagesIn, questionImagesOut, commentaryImagesIn, commentaryImagesOut);
            if(!saved){
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        } catch (Exception e) { //불필요 하다고 판단될시에 제외
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    //Read API
    @GetMapping("exams/{examId}/questions")
    public QuestionsListDto selectQuestions(@PathVariable @ValidExamId Long examId, @RequestParam @ValidParams Map<String, String> params, HttpServletResponse response) {
        try {
            QuestionsSearch questionsSearch = buildQuestionsSearch(params);
            QuestionsListDto questionsListDto = questionsService.searchFromQuestions(examId, questionsSearch);
            if (questionsListDto.getSize() == 0) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                return null;
            } else {
                return questionsListDto;
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return null;
        }
    }
    //Read 파라미터 처리 로직
    private QuestionsSearch buildQuestionsSearch(Map<String, String> params){
        Map<String, List<String>> tags = new HashMap<>();
        List<String> includes = new ArrayList<>();
        int count = 10;

        for (Map.Entry<String, String> entry : params.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            if (key.startsWith("tags_")) {
                String[] tokens = key.split("_",2);
                String category = tokens[1];
                //키가 맵에 없으면 새로 생성, value값이 list타입이므로 새로 생성
                tags.computeIfAbsent(category, k -> new ArrayList<String>()).add(value);
            } else if (key.equals("includes")) {
                includes.add(value);
            } else if (key.equals("count")) {
                if (count < 1) {
                    throw new IllegalArgumentException("Count 값은 1 이상의 양수여야 합니다.");
                }
                count = Integer.parseInt(value);
            }
        }

        return QuestionsSearch.builder()
                .tags(tags)
                .count(count)
                .includes(includes)
                .build();
    }

    //Update API
    @PutMapping("questions")
    public void updateQuestions(@RequestBody QuestionUpdateDto questionUpdateDto, HttpServletResponse response) {
        try {
            boolean updated = questionsService.updateQuestionsByQuestionId(questionUpdateDto);
            if(!updated){
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    //Delete API with examId
    @DeleteMapping("exams/{examId}/questions")
    public void deleteQuestionsByExamId(@PathVariable @ValidExamId Long examId, HttpServletResponse response) {
        try {
            boolean deleted = questionsService.deleteQuestionsByExamId(examId);
            if(!deleted){
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    //Delete Api with questionId
    @DeleteMapping("questions/{questionId}")
    public void deleteQuestionsByQuestionId(@PathVariable String questionId, HttpServletResponse response) {
        try {
            boolean deleted = questionsService.deleteQuestionsByQuestionId(questionId);
            if(!deleted){
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
