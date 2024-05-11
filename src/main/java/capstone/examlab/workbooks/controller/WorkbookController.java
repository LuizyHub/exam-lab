package capstone.examlab.workbooks.controller;

import capstone.examlab.ResponseDto;
import capstone.examlab.exhandler.exception.UnauthorizedException;
import capstone.examlab.users.argumentresolver.Login;
import capstone.examlab.users.domain.User;
import capstone.examlab.workbooks.dto.WorkbookCreateDto;
import capstone.examlab.workbooks.dto.WorkbookDto;
import capstone.examlab.workbooks.dto.WorkbookSummaryDto;
import capstone.examlab.workbooks.service.WorkbookService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/workbooks")
public class WorkbookController {

    private final WorkbookService workbookService;

    @GetMapping
    public ResponseDto<List<WorkbookSummaryDto>> getWorkbooks(@Login User user) {

        // AOP 도입 예정
        if (user == null) {
            throw new UnauthorizedException();
        }

        List<WorkbookSummaryDto> workbookSummaryDtos = workbookService.getWorkbooks(user);

        return new ResponseDto<>(200, workbookSummaryDtos);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseDto<WorkbookDto> createWorkbook(
            @Login User user,
            @RequestBody @Validated WorkbookCreateDto workbookCreateDto
    ) throws JsonProcessingException {
        // AOP 도입 예정
        if (user == null) {
            throw new UnauthorizedException();
        }

        WorkbookDto workbookDto = workbookService.createWorkbook(user, workbookCreateDto);

        return new ResponseDto<WorkbookDto>(201, workbookDto);
    }


    @GetMapping("/{workbookId}")
    public ResponseDto<WorkbookDto> getWorkbook(
            @Login User user,
            @PathVariable String workbookId
    ) throws BadRequestException {
        // AOP 도입 예정
        if (user == null) {
            throw new UnauthorizedException();
        }

        WorkbookDto workbookDto = workbookService.getWorkbook(user, workbookId);

        return new ResponseDto<WorkbookDto>(200, workbookDto);
    }

    @PutMapping("/{workbookId}")
    public ResponseDto<WorkbookDto> updateWorkbook(
            @Login User user,
            @PathVariable String workbookId,
            @RequestBody @Validated WorkbookDto workbookDto
    ) throws BadRequestException {
        // AOP 도입 예정
        if (user == null) {
            throw new UnauthorizedException();
        }

        WorkbookDto updatedWorkbook = workbookService.updateWorkbook(user, workbookId, workbookDto);

        return new ResponseDto<WorkbookDto>(200, updatedWorkbook);
    }

    @DeleteMapping("/{workbookId}")
    public ResponseDto deleteWorkbook(
            @Login User user,
            @PathVariable String workbookId
    ) {
        // AOP 도입 예정
        if (user == null) {
            throw new UnauthorizedException();
        }

        workbookService.deleteWorkbook(user, workbookId);

        return ResponseDto.OK;
    }
}
