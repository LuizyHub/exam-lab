package capstone.examlab.exams.controller;

import capstone.examlab.exams.dto.ExamDto;
import capstone.examlab.exams.service.ExamsService;
import capstone.examlab.exams.dto.ExamTypeDto;
import capstone.examlab.valid.ValidExamId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
