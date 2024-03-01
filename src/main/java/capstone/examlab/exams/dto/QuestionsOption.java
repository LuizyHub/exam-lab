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

    // 기본 생성자와 Builder 생성자에 ArrayList 사용
    public QuestionsOption() {
        this.tags = new ArrayList<>();
        this.includes = new ArrayList<>();
    }

    @Builder
    public QuestionsOption(List<String> tags, Integer count, List<String> includes) {
        this.tags = tags;
        this.count = count;
        this.includes = includes;
    }
}
