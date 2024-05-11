package capstone.examlab.workbooks.service;

import capstone.examlab.users.domain.User;
import capstone.examlab.workbooks.domain.Workbook;
import capstone.examlab.workbooks.dto.WorkbookCreateDto;
import capstone.examlab.workbooks.dto.WorkbookDto;
import capstone.examlab.workbooks.dto.WorkbookSummaryDto;
import capstone.examlab.workbooks.repository.WorkbookRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorkbookServiceImpl implements WorkbookService {

    private final WorkbookRepository workbookRepository;

    @Override
    public List<WorkbookSummaryDto> getWorkbooks(User user) {
        List<Workbook> workbookList = workbookRepository.findAllByUserId(user.getId());

        return workbookList.stream()
                .map(WorkbookSummaryDto::fromDomain)
                .toList();
    }

    @Override
    public WorkbookDto createWorkbook(User user, WorkbookCreateDto workbookCreateDto) throws JsonProcessingException {
        Workbook workbook = workbookCreateDto.toDomain(user.getId());
        workbookRepository.save(workbook);

        return WorkbookDto.fromDomain(workbook);
    }

    @SneakyThrows
    @Override
    public WorkbookDto getWorkbook(User user, String workbookId) throws BadRequestException {
        return workbookRepository.findById(workbookId)
                .filter(workbook -> workbook.getUserId().equals(user.getId()))
                .map(WorkbookDto::fromDomain)
                .orElseThrow(() -> new BadRequestException("Workbook not found"));
    }

    @Override
    public WorkbookDto updateWorkbook(User user, String workbookId, WorkbookDto workbookDto) throws BadRequestException {
        return workbookRepository.findById(workbookId)
                .filter(workbook -> workbook.getUserId().equals(user.getId()))
                .map(workbook -> {
                    workbook.setTitle(workbookDto.getTitle());
                    workbook.setSummary(workbookDto.getSummary());
                    try {
                        workbook.setContent(workbookDto.getContent());
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                    workbookRepository.save(workbook);
                    return WorkbookDto.fromDomain(workbook);
                })
                .orElseThrow(() -> new BadRequestException("Workbook not found"));
    }

    @Override
    public void deleteWorkbook(User user, String workbookId) {
        workbookRepository.findById(workbookId)
                .filter(workbook -> workbook.getUserId().equals(user.getId()))
                .ifPresent(workbookRepository::delete);
    }
}
