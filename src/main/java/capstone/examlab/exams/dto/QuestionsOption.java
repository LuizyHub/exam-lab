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
    private String includes;

    @Builder
    public QuestionsOption(List<String> tags, Integer count, String includes) {
        this.tags = tags;
        this.count = (count == null) ? 10 : count;
        this.includes = includes;
    }
}
