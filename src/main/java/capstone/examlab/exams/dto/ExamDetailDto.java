package capstone.examlab.exams.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@ToString
public class ExamDetailDto {
    @Setter
    private String examTitle;
    private final Map<String, List<String>> tags;

    public ExamDetailDto(Map<String, List<String>> tags) {
        this.tags = tags;
    }

    public ExamDetailDto() {
        this.tags = new HashMap<>();
    }
}
