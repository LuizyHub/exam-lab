package capstone.examlab.exams.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionsOption {
    private List<String> tags;
    private Integer count;
    private List<String> includes;
}
