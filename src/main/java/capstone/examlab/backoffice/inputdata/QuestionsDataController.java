package capstone.examlab.backoffice.inputdata;


import capstone.examlab.questions.entity.QuestionEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("backoffice")
public class QuestionsDataController {
    private final QuestionsDataService questionsDataService;
    //'기존 문제' 저장 로직
    @PostMapping("{examId}/questions")
    public ResponseEntity<String> addOriginalQuestions(@PathVariable Long examId, @RequestBody List<QuestionEntity> questionEntities) {
        for (QuestionEntity questionEntity : questionEntities) {
            questionEntity.setExamId(examId);
        }
        questionsDataService.saveQuestions(questionEntities);
        return ResponseEntity.ok("data add success");
    }
}
