package capstone.examlab.questions.controller;

import capstone.examlab.image.dto.ImagesUploadInfo;
import capstone.examlab.questions.dto.QuestionsList;
import capstone.examlab.questions.dto.search.QuestionsSearch;
import capstone.examlab.questions.dto.update.QuestionsUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUpload;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import capstone.examlab.questions.dto.upload.QuestionsUpload;
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

    //Create API, '신규 문제' 저장 API
    @PostMapping("{examId}/questions")
    public ResponseEntity<String> addQuestionsByExamId(@PathVariable Long examId, @RequestPart QuestionUploadInfo questionUploadInfo, @RequestPart List<MultipartFile> questionImagesIn, @RequestPart List<MultipartFile> questionImagesOut, @RequestPart List<MultipartFile> commentaryImagesIn, @RequestPart List<MultipartFile> commentaryImagesOut) {
        boolean saved = questionsService.addQuestionsByExamId(examId, questionUploadInfo,questionImagesIn, questionImagesOut, commentaryImagesIn, commentaryImagesOut);
        if(saved){
            return ResponseEntity.ok("question add suucess");
        }
        else{
            return ResponseEntity.badRequest().body("question add error");
        }
    }

    //Json형태의 텍스트 데이터 받기
/*    @PostMapping("{examId}/questions")
    public ResponseEntity<String> addQuestionsByExamId(@PathVariable Long examId, @RequestBody QuestionsUpload questionsUpload) {
        questionsService.addQuestionsByExamId(examId,questionsUpload );
        return ResponseEntity.ok("data add success");
    }

    //form-data형식으로 imageFile 및 데이터 받기
    @PostMapping("questions/image")
    public ResponseEntity<String> addImagesInQuestions(@ModelAttribute ImagesUploadInfo imagesUploadInfo) {
        boolean notNull = questionsService.addImageInQuestions(imagesUploadInfo);
        if(notNull) {
            return ResponseEntity.ok("image add success");
        }
        else{
            return ResponseEntity.badRequest().body("image add error");
        }
    }*/

    //Read API
    @GetMapping("{examId}/questions/search")
    public QuestionsList selectQuestions(@PathVariable Long examId, @RequestBody QuestionsSearch questionsSearch) {
        log.info("questionOptionDto = {}", questionsSearch);
        return questionsService.searchFromQuestions(examId, questionsSearch);
    }

    //Update API
    @PostMapping("/questions/update")
    public ResponseEntity<String> updateQuestions(@RequestBody QuestionsUpdateDto questionsUpdateDto){
  /*      for (QuestionUpdateDto questionUpdateDto : questionsUpdateDto) {
            log.info(questionUpdateDto.toString());
        }*/
        boolean updated = questionsService.updateQuestionsByUUID(questionsUpdateDto);
        if(updated){
            return ResponseEntity.ok("data update success");
        }else{
            return ResponseEntity.badRequest().body("data update error");
        }
    }

    //Delete API
    //문제들(examId) 삭제 API
    @DeleteMapping("{examId}/questions")
    public ResponseEntity<String> deleteQuestionsByExamId(@PathVariable Long examId) {
        boolean deleted = questionsService.deleteQuestionsByExamId(examId);
        if (deleted) {
            return ResponseEntity.ok("data delete success");
        } else {
            return ResponseEntity.badRequest().body("data delete error");
        }
    }

    //문제들(List<uuid>) API
    @DeleteMapping("questions/uuid")
    public ResponseEntity<String> deleteQuestionsByUUID(@RequestBody List<String> uuidList) {
        boolean deleted = questionsService.deleteQuestionsByUuidList(uuidList);
        if (deleted) {
            return ResponseEntity.ok("data delete success");
        } else {
            return ResponseEntity.badRequest().body("data delete error");
        }
    }
}
