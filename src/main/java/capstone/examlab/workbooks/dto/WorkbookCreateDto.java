package capstone.examlab.workbooks.dto;

import capstone.examlab.workbooks.domain.Workbook;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WorkbookCreateDto {

    @NotNull
    @NotBlank
    private String title;

    private String summary = "";

    @NotNull
    private JsonNode content;

    public Workbook toDomain(String userId) throws JsonProcessingException {
        Workbook workbook = new Workbook();
        workbook.setUserId(userId);
        workbook.setTitle(title);
        workbook.setSummary(summary);
        workbook.setContent(content);
        return workbook;
    }
}
