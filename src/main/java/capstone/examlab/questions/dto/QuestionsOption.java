package capstone.examlab.questions.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuestionsOption {
    private List<String> tags;
    private String count;
    private String includes;

    @Builder
    public QuestionsOption(List<String> tags, String count, String includes) {
        this.tags = tags;
        this.count = (count == null) ? "10" : count;
        this.includes = includes;
    }
}
