package capstone.examlab.exams.controller;

import capstone.examlab.ResponseDto;
import capstone.examlab.exams.dto.*;
import capstone.examlab.exams.service.ExamsService;
import capstone.examlab.exhandler.exception.UnauthorizedException;
import capstone.examlab.questions.dto.QuestionsListDto;
import capstone.examlab.questions.dto.search.QuestionsSearchDto;
import capstone.examlab.questions.service.QuestionsService;
import capstone.examlab.users.argumentresolver.Login;
import capstone.examlab.users.domain.User;
import capstone.examlab.valid.ValidExamId;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/exams")
public class ExamsController {

    private final ExamsService examsService;

    private final QuestionsService questionsService;

    @GetMapping
    public ExamsResponseGetDto getExams(
            @Login User user,
            @RequestParam(name = "sample", required = false, defaultValue = "false") boolean sample) {
        ExamsResponseGetDto response = new ExamsResponseGetDto();
        response.setExams(examsService.getExamList(user, sample));
        return response;
    }

    @GetMapping("/{examId}")
    public ExamDetailDto getExamType(
            @Login User user,
            @PathVariable @ValidExamId Long examId) {

        ExamDetailDto examType = examsService.getExamType(examId, user);

        return examType;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseDto createExam(
            @Login User user,
            @Validated @RequestBody ExamAddDto examAddDto) {

        // AOP 도입 예정
        if (user == null) {
            throw new UnauthorizedException();
        }

        Long createdExamId = examsService.createExam(examAddDto, user);
        return ResponseDto.of(HttpServletResponse.SC_CREATED, createdExamId.toString());
    }

    @DeleteMapping("/{examId}")
    public ResponseDto deleteExam(
            @Login User user,
            @PathVariable @ValidExamId Long examId) {
        // AOP 도입 예정
        if (user == null||!examsService.isExamOwner(examId, user)) {
            throw new UnauthorizedException();
        }
        examsService.deleteExam(examId, user);
        questionsService.deleteQuestionsByExamId(examId);
        return ResponseDto.OK;
    }

    @PutMapping("/{examId}")
    public ResponseDto updateExam(
            @Login User user,
            @PathVariable @ValidExamId Long examId,
            @Validated @RequestBody ExamUpdateDto examUpdateDto) {

        // AOP 도입 예정
        if (user == null) {
            throw new UnauthorizedException();
        }

        examsService.updateExam(examId, examUpdateDto, user);

        return ResponseDto.OK;
    }

    @GetMapping("/{examId}/file")
    public ResponseDto<FileGetResponseDto> readExamFile(
            @Login User user,
            @PathVariable @ValidExamId Long examId) {
        FileGetResponseDto responseDto = examsService.getExamFileTitle(examId, user);
        return new ResponseDto<>(HttpStatus.OK.value(), responseDto);
    }

    @PostMapping("/{examId}/file")
    public ResponseDto uploadExamFile(
            @Login User user,
            @PathVariable @ValidExamId Long examId,
            @RequestParam("file") MultipartFile file) throws BadRequestException {

        if (file.isEmpty()) {
            return ResponseDto.of(HttpServletResponse.SC_BAD_REQUEST, "파일이 비어있습니다.");
        }

        examsService.saveExamFile(examId, file, user);

        return ResponseDto.OK;
    }

    @DeleteMapping("/{examId}/file")
    public ResponseDto deleteExamFile(
            @Login User user,
            @PathVariable @ValidExamId Long examId) {

        examsService.deleteExamFile(examId, user);

        return ResponseDto.OK;
    }

    @PostMapping("/{examId}/ai")
    public QuestionsListDto addAIQuestionsByExamId(
            @Login User user,
            @PathVariable @ValidExamId Long examId) throws BadRequestException {

        // TODO: AI 서비스 연동
        QuestionsListDto questionsListDto = examsService.getAiQuestions(examId, user);

        return questionsListDto;
    }
}
