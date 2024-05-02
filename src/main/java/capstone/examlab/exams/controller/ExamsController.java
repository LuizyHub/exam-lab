package capstone.examlab.exams.controller;

import capstone.examlab.ResponseDto;
import capstone.examlab.exams.dto.*;
import capstone.examlab.exams.service.ExamsService;
import capstone.examlab.exhandler.exception.UnauthorizedException;
import capstone.examlab.users.argumentresolver.Login;
import capstone.examlab.users.domain.User;
import capstone.examlab.valid.ValidExamId;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/exams")
public class ExamsController {

    private final ExamsService examsService;

    @GetMapping
    public ExamsResponseGetDto getExams(@Login User user) {
        ExamsResponseGetDto response = new ExamsResponseGetDto();
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
    public void deleteExam(
            @Login User user,
            @PathVariable @ValidExamId Long examId) {

        // AOP 도입 예정
        if (user == null) {
            throw new UnauthorizedException();
        }

        examsService.deleteExam(examId, user);
    }

    @PutMapping("/{examId}")
    public ResponseDto updateExam(
            @Login User user,
            @PathVariable @ValidExamId Long examId,
            @Validated @RequestBody ExamUpdateDto examUpdateDto,
            HttpServletResponse response) {

        // AOP 도입 예정
        if (user == null) {
            throw new UnauthorizedException();
        }

        examsService.updateExam(examId, examUpdateDto, user);

        return ResponseDto.OK;
    }

//    @PutMapping("/{examId}/pdf")
//    public ResponseDto updateExamPDF(@PathVariable Long examId, @RequestParam("pdfFile") MultipartFile multipartPDF) {
//        String pdfUrl = examsService.savePDFAndSetUrl(examId, multipartPDF);
//        return ResponseDto.of(HttpStatus.CREATED.value(), pdfUrl);
//    }
//
//    @GetMapping("/{examId}/pdf")
//    public ResponseDto readExamPDF(@PathVariable Long examId) {
//        String pdfUrl = examsService.getPDFUrl(examId);
//        if(pdfUrl == null) {
//            return ResponseDto.BAD_REQUEST;
//        }
//        return ResponseDto.of(HttpStatus.CREATED.value(), pdfUrl);
//    }
}
