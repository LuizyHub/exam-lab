package capstone.examlab.exams.dto;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class QuestionsOption {
    private List<String> tags;
    private Integer count;
    private List<String> includes;
}
