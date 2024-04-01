package capstone.examlab.questions.controller;

import capstone.examlab.questions.dto.QuestionsList;
import capstone.examlab.questions.dto.search.QuestionsSearch;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import capstone.examlab.questions.service.QuestionsService;
import capstone.examlab.valid.ValidExamId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/exams/")
public class QuestionsController {
    private final QuestionsService questionsService;

    //Create API
    @PostMapping("{examId}/questions")
    public ResponseEntity<String> addQuestionsByExamId(@PathVariable Long examId, @RequestPart QuestionUploadInfo questionUploadInfo, @RequestPart(name = "questionImagesIn", required = false) List<MultipartFile> questionImagesIn,
           @RequestPart(name = "questionImagesOut", required = false) List<MultipartFile> questionImagesOut, @RequestPart(name = "commentaryImagesIn", required = false) List<MultipartFile> commentaryImagesIn, @RequestPart(name = "commentaryImagesOut", required = false) List<MultipartFile> commentaryImagesOut) {
        boolean saved = questionsService.addQuestionsByExamId(examId, questionUploadInfo,questionImagesIn, questionImagesOut, commentaryImagesIn, commentaryImagesOut);
        if(saved){
            return ResponseEntity.ok("question add suucess");
        }
        else{
            return ResponseEntity.badRequest().body("question add error");
        }
    }

    //Read API
    @GetMapping("{examId}/questions")
    public QuestionsList selectQuestions(@PathVariable @ValidExamId Long examId, @RequestBody QuestionsSearch questionsSearch) {
        log.info("questionOptionDto = {}", questionsSearch);
        return questionsService.searchFromQuestions(examId, questionsSearch);
    }

    //Update API
    @PutMapping("/questions")
    public ResponseEntity<String> updateQuestions(@RequestBody QuestionUpdateDto questionUpdateDto){
        boolean updated = questionsService.updateQuestionsByQuestionId(questionUpdateDto);
        if(updated){
            return ResponseEntity.ok("data update success");
        }else{
            return ResponseEntity.badRequest().body("data update error");
        }
    }

    //Delete API with examId
    @DeleteMapping("{examId}/questions")
    public ResponseEntity<String> deleteQuestionsByExamId(@PathVariable @ValidExamId Long examId) {
        boolean deleted = questionsService.deleteQuestionsByExamId(examId);
        if (deleted) {
            return ResponseEntity.ok("data delete success");
        } else {
            return ResponseEntity.badRequest().body("data delete error");
        }
    }

    //Delete Api with questionId
    @DeleteMapping("questions/{questionId}")
    public ResponseEntity<String> deleteQuestionsByQuestionId(@PathVariable String questionId) {
        boolean deleted = questionsService.deleteQuestionsByQuestionId(questionId);
        if (deleted) {
            return ResponseEntity.ok("data delete success");
        } else {
            return ResponseEntity.badRequest().body("data delete error");
        }
    }
}
