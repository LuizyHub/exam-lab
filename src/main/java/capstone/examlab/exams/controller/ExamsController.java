package capstone.examlab.exams.controller;

import capstone.examlab.ResponseDto;
import capstone.examlab.exams.dto.*;
import capstone.examlab.exams.service.ExamsService;
import capstone.examlab.users.argumentresolver.Login;
import capstone.examlab.users.domain.User;
import capstone.examlab.valid.ValidExamId;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/exams")
public class ExamsController {

    private final ExamsService examsService;

    @GetMapping
    public GetExamsResponseDto getExams(@Login User user) {
        GetExamsResponseDto response = new GetExamsResponseDto();
        response.setExams(examsService.getExamList(user));
        return response;
    }

    @GetMapping("/{examId}")
    public ExamDetailDto getExamType(
            @Login User user,
            @PathVariable @ValidExamId Long examId) {

        ExamDetailDto examType = examsService.getExamType(examId, user);

        return examType;
    }

    @PostMapping
    public ResponseDto createExam(
            @Login User user,
            @Validated @RequestBody ExamAddDto examAddDto,
            HttpServletResponse response) {

        // AOP 도입 예정
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

        Long createdExamId = examsService.createExam(examAddDto, user);
        response.setStatus(HttpServletResponse.SC_CREATED);
        return ResponseDto.of(HttpServletResponse.SC_CREATED, createdExamId.toString());
    }

    @DeleteMapping("/{examId}")
    public void deleteExam(
            @Login User user,
            @PathVariable @ValidExamId Long examId,
            HttpServletResponse response) {

        // AOP 도입 예정
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        examsService.deleteExam(examId, user);
    }

    @PutMapping("/{examId}")
    public void updateExam(
            @Login User user,
            @PathVariable @ValidExamId Long examId,
            @Validated @RequestBody ExamUpdateDto examUpdateDto,
            HttpServletResponse response) {

        // AOP 도입 예정
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        examsService.updateExam(examId, examUpdateDto, user);
    }
}
