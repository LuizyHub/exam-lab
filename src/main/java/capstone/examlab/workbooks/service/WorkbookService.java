package capstone.examlab.workbooks.service;

import capstone.examlab.users.domain.User;
import capstone.examlab.workbooks.dto.WorkbookCreateDto;
import capstone.examlab.workbooks.dto.WorkbookDto;
import capstone.examlab.workbooks.dto.WorkbookSummaryDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface WorkbookService {

    List<WorkbookSummaryDto> getWorkbooks(User user);

    WorkbookDto createWorkbook(User user, WorkbookCreateDto workbookCreateDto) throws JsonProcessingException;

    WorkbookDto getWorkbook(User user, String workbookId) throws BadRequestException;

    WorkbookDto updateWorkbook(User user, String workbookId, WorkbookDto workbookDto) throws BadRequestException;

    void deleteWorkbook(User user, String workbookId);
}
