package capstone.examlab.questions.controller;

import capstone.examlab.questions.dto.ImageSaveDto;
import capstone.examlab.questions.dto.QuestionsList;
import capstone.examlab.questions.dto.QuestionsOption;
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
@RequestMapping("api/v1/exams/{examId}/questions")
public class QuestionsController {
    private final QuestionsService questionsService;
    @GetMapping
    public QuestionsList getExamQuestions(@PathVariable @ValidExamId Long examId, @ModelAttribute @Valid QuestionsOption questionsOption) {
        log.info("questionOptionDto = {}", questionsOption);
        return questionsService.findByDriverLicenseQuestions(examId, questionsOption);
    }

    //이미지 관련 API
    @PostMapping("image")
    public List<String> saveImages(@ModelAttribute ImageSaveDto imageSaveDto) {
        return questionsService.saveImages(imageSaveDto);
    }

    @DeleteMapping("image/delete/{imageName}")
    public ResponseEntity<String> deleteImages(@PathVariable String imageName){
        questionsService.deleteImages(imageName);
        return ResponseEntity.ok("delete "+imageName);
    }
}
