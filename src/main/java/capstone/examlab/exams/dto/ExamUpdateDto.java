package capstone.examlab.exams.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ExamUpdateDto {
    @NotNull
    @NotBlank
    private String examTitle;
    @NotNull
    private Map<String, List<String>> tags;
}
