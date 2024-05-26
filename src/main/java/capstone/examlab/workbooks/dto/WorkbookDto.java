package capstone.examlab.workbooks.dto;

import capstone.examlab.workbooks.domain.Workbook;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class WorkbookDto {
    private String id;
    @NotNull
    @NotBlank
    private String title;

    @NotNull
    private String summary;

    @NotNull
    private JsonNode content;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    public WorkbookDto(String id, String title, String summary, JsonNode content, LocalDateTime createdDate, LocalDateTime updatedDate) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    public static WorkbookDto fromDomain(Workbook workbook) {
        WorkbookDto workbookDto = null;
        try {
            workbookDto = new WorkbookDto(
                    workbook.getId(),
                    workbook.getTitle(),
                    workbook.getSummary(),
                    workbook.getContent(),
                    workbook.getCreatedDate(),
                    workbook.getUpdatedDate()
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return workbookDto;
    }
}
