package capstone.examlab.questions.controller;

import capstone.examlab.ResponseDto;
import capstone.examlab.exhandler.exception.NotFoundQuestionException;
import capstone.examlab.questions.dto.QuestionsListDto;
import capstone.examlab.questions.dto.search.QuestionsSearchDto;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import capstone.examlab.questions.service.QuestionsService;
import capstone.examlab.valid.ValidExamId;
import capstone.examlab.valid.ValidParams;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("exams/{examId}/questions")
    public ResponseDto addQuestionsByExamId(@PathVariable @ValidExamId Long examId, @RequestPart QuestionUploadInfo questionUploadInfo, @RequestPart(name = "questionImagesIn", required = false) List<MultipartFile> questionImagesIn,
                                            @RequestPart(name = "questionImagesOut", required = false) List<MultipartFile> questionImagesOut, @RequestPart(name = "commentaryImagesIn", required = false) List<MultipartFile> commentaryImagesIn,
                                            @RequestPart(name = "commentaryImagesOut", required = false) List<MultipartFile> commentaryImagesOut) {

        String questionId = questionsService.addQuestionsByExamId(examId, questionUploadInfo, questionImagesIn, questionImagesOut, commentaryImagesIn, commentaryImagesOut);
        if (questionId == null) {
            return ResponseDto.BAD_REQUEST;
        }
        return new ResponseDto(201,questionId);
    }

    //Read API
    @GetMapping("exams/{examId}/questions")
    public QuestionsListDto selectQuestions(@PathVariable @ValidExamId Long examId, @RequestParam @ValidParams Map<String, String> params) {
        QuestionsSearchDto questionsSearchDto = buildQuestionsSearch(params);
        QuestionsListDto questionsListDto = questionsService.searchFromQuestions(examId, questionsSearchDto);
        if (questionsListDto.getSize() == 0) {
            throw new NotFoundQuestionException();
        } else {
            return questionsListDto;
        }
    }

    //Read 파라미터 처리 로직
    private QuestionsSearchDto buildQuestionsSearch(Map<String, String> params) {
        Map<String, List<String>> tags = new HashMap<>();
        List<String> includes = new ArrayList<>();
        int count = 10;

        for (Map.Entry<String, String> entry : params.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            if (key.startsWith("tags_")) {
                String[] tokens = key.split("_", 2);
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

        return QuestionsSearchDto.builder()
                .tags(tags)
                .count(count)
                .includes(includes)
                .build();
    }

    //Update API
    @PutMapping("questions")
    public ResponseDto updateQuestions(@RequestBody QuestionUpdateDto questionUpdateDto) {
        boolean updated = questionsService.updateQuestionsByQuestionId(questionUpdateDto);
        if (!updated) {
            return ResponseDto.BAD_REQUEST;
        }
        return ResponseDto.OK;
    }

    //Delete API with examId
    @DeleteMapping("exams/{examId}/questions")
    public ResponseDto deleteQuestionsByExamId(@PathVariable @ValidExamId Long examId, HttpServletResponse response) {
        boolean deleted = questionsService.deleteQuestionsByExamId(examId);
        if (!deleted) {
            return ResponseDto.BAD_REQUEST;
        }
        return ResponseDto.OK;
    }

    //Delete Api with questionId
    @DeleteMapping("questions/{questionId}")
    public ResponseDto deleteQuestionsByQuestionId(@PathVariable String questionId, HttpServletResponse response) {
        boolean deleted = questionsService.deleteQuestionsByQuestionId(questionId);
        if(!deleted) {
            return ResponseDto.BAD_REQUEST;
        }
        return ResponseDto.OK;
    }
}
