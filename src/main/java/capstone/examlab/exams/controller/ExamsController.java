package capstone.examlab.exams.controller;

import capstone.examlab.exams.dto.ExamAddDto;
import capstone.examlab.exams.dto.ExamDto;
import capstone.examlab.exams.dto.ExamPatchDto;
import capstone.examlab.exams.service.ExamsService;
import capstone.examlab.exams.dto.ExamTypeDto;
import capstone.examlab.users.argumentresolver.Login;
import capstone.examlab.users.domain.User;
import capstone.examlab.valid.ValidExamId;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/exams")
public class ExamsController {

    private final ExamsService examsService;

    @GetMapping
    public List<ExamDto> getExams() {
        List<ExamDto> examList = examsService.getExamList();
        return examList;
    }

    @GetMapping("/{examId}")
    public ExamTypeDto getExamType(@PathVariable @ValidExamId Long examId) {
        ExamTypeDto examType = examsService.getExamType(examId);
        return examType;
    }

    @PostMapping
    public Long createExam(
            @Login User user,
            @Validated @RequestBody ExamAddDto examAddDto,
            HttpServletResponse response) {

        // AOP 도입 예정
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

        return examsService.createExam(examAddDto, user);
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

    @PatchMapping("/{examId}")
    public void updateExam(
            @Login User user,
            @PathVariable @ValidExamId Long examId,
            @Validated @RequestBody ExamPatchDto examPatchDto,
            HttpServletResponse response) {

        // AOP 도입 예정
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        examsService.patchExam(examId, examPatchDto, user);
    }
}
