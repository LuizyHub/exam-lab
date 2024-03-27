package capstone.examlab.questions.controller;

import capstone.examlab.questions.dto.ImageSave;
import capstone.examlab.questions.dto.QuestionsList;
import capstone.examlab.questions.dto.search.QuestionsSearch;
import capstone.examlab.questions.dto.upload.QuestionsUpload;
import capstone.examlab.questions.service.QuestionsService;
import capstone.examlab.valid.ValidExamId;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/exams/")
public class QuestionsController {
    private final QuestionsService questionsService;
    //Create API, '신규 문제' 저장 API
    //Json형태의 텍스트 데이터 받기
    @PostMapping("{examId}/questions")
    public ResponseEntity<String> addQuestionsByExamId(@PathVariable Long examId, @RequestBody QuestionsUpload questionsUpload) {
        questionsService.addQuestionsByExamId(examId,questionsUpload );
        return ResponseEntity.ok("data add success");
    }

/*
    @GetMapping
    public QuestionsList getExamQuestions(@PathVariable @ValidExamId Long examId, @ModelAttribute @Valid QuestionsSearch questionsSearch) {
        log.info("questionOptionDto = {}", questionsSearch);
        return questionsService.findByDriverLicenseQuestions(examId, questionsSearch);
    }
*/

    //이미지 관련 API
    @PostMapping("image")
    public List<String> saveImages(@ModelAttribute ImageSave imageSave) {
        return questionsService.saveImages(imageSave);
    }

    @DeleteMapping("image/delete/{imageName}")
    public ResponseEntity<String> deleteImages(@PathVariable String imageName){
        questionsService.deleteImages(imageName);
        return ResponseEntity.ok("delete "+imageName);
    }
}
