package capstone.examlab.questions.controller;

import capstone.examlab.ResponseDto;
import capstone.examlab.exams.service.ExamsService;
import capstone.examlab.exhandler.exception.NotFoundQuestionException;
import capstone.examlab.exhandler.exception.UnauthorizedException;
import capstone.examlab.questions.dto.QuestionDto;
import capstone.examlab.questions.dto.QuestionsListDto;
import capstone.examlab.questions.dto.search.QuestionsSearchDto;
import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import capstone.examlab.questions.service.QuestionsService;
import capstone.examlab.users.argumentresolver.Login;
import capstone.examlab.users.domain.User;
import capstone.examlab.valid.ValidExamId;
import capstone.examlab.valid.ValidParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1")
public class QuestionsController {
    private final QuestionsService questionsService;
    private final ExamsService examsService;

    //Create API
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/exams/{examId}/questions")
    public ResponseDto addQuestionsByExamId(@PathVariable @ValidExamId Long examId, @RequestPart QuestionUploadInfo questionUploadInfo, @RequestPart(name = "questionImagesIn", required = false) List<MultipartFile> questionImagesIn,
                                            @RequestPart(name = "questionImagesOut", required = false) List<MultipartFile> questionImagesOut, @RequestPart(name = "commentaryImagesIn", required = false) List<MultipartFile> commentaryImagesIn,
                                            @RequestPart(name = "commentaryImagesOut", required = false) List<MultipartFile> commentaryImagesOut, @Login User user) {
        if (!examsService.isExamOwner(examId, user)) {
            throw new UnauthorizedException();
        }
        QuestionDto question = questionsService.addQuestionsByExamId(user, examId, questionUploadInfo, questionImagesIn, questionImagesOut, commentaryImagesIn, commentaryImagesOut);
        return new ResponseDto(201, question);
    }

    //Read API
    @GetMapping("/exams/{examId}/questions")
    public QuestionsListDto selectQuestions(@PathVariable @ValidExamId Long examId, @RequestParam MultiValueMap params) {
        QuestionsSearchDto questionsSearchDto = buildQuestionsSearch(params);
        QuestionsListDto questionsListDto = questionsService.searchFromQuestions(examId, questionsSearchDto);
        if (questionsListDto.getSize() == 0) {
            throw new NotFoundQuestionException();
        } else {
            return questionsListDto;
        }
    }

    //Read 파라미터 처리 로직
    private QuestionsSearchDto buildQuestionsSearch(Map<String, List<String>> params) {
        Map<String, List<String>> tags = new HashMap<>();
        List<String> includes = new ArrayList<>();
        int count = 10;
        for (Map.Entry<String, List<String>> entry : params.entrySet()) {
            String key = entry.getKey();
            List<String> values = entry.getValue();
            if (key.startsWith("tags_")) {
                String[] tokens = key.split("_", 2);
                String category = tokens[1];
                tags.computeIfAbsent(category, k -> new ArrayList<>()).addAll(values);
            } else if (key.equals("includes")) {
                includes.addAll(values);
            } else if (key.equals("count")) {
                try {
                    count = Integer.parseInt(values.get(0));
                    if (count < 0) {
                        throw new IllegalArgumentException("Count 값은 0 이상이어야 합니다.");
                    }
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException("Count 값은 정수형이어야 합니다.");
                }
            }
        }

        return QuestionsSearchDto.builder()
                .tags(tags)
                .count(count)
                .includes(includes)
                .build();
    }

    //Update API
    @PutMapping("/questions")
    public ResponseDto updateQuestions(@Login User user, @RequestBody QuestionUpdateDto questionUpdateDto) throws BadRequestException {
        Long examId = questionsService.getExamIDFromQuestion(questionUpdateDto.getId());
        if (!examsService.isExamOwner(examId, user)) {
            throw new UnauthorizedException();
        }
        questionsService.updateQuestionsByQuestionId(user, questionUpdateDto);
        return ResponseDto.OK;
    }

    //Delete Api with questionId
    @DeleteMapping("/questions/{questionId}")
    public ResponseDto deleteQuestionsByQuestionId(@Login User user, @PathVariable String questionId) {
        Long examId = questionsService.getExamIDFromQuestion(questionId);
        if (!examsService.isExamOwner(examId, user)) {
            throw new UnauthorizedException();
        }
        questionsService.deleteQuestionsByQuestionId(user, questionId);
        return ResponseDto.OK;
    }
}
