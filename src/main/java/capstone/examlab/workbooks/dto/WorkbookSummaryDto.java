package capstone.examlab.workbooks.dto;

import capstone.examlab.workbooks.domain.Workbook;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class WorkbookSummaryDto {

    private String id;

    private String title;

    private String summary;

    private LocalDateTime createdDate;

    private LocalDateTime updatedDate;

    public WorkbookSummaryDto(String id, String title, String summary, LocalDateTime createdDate, LocalDateTime updatedDate) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    public static WorkbookSummaryDto fromDomain(Workbook workbook) {
        return new WorkbookSummaryDto(
                workbook.getId(),
                workbook.getTitle(),
                workbook.getSummary(),
                workbook.getCreatedDate(),
                workbook.getUpdatedDate()
        );
    }
}
