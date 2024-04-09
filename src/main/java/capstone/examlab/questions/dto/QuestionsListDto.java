package capstone.examlab.questions.dto;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuestionsListDto {
    private List<QuestionDto> questions;

    public QuestionsListDto(List<QuestionDto> questions) {
        this.questions = questions;
    }

    public int getSize() {
        return questions.size();
    }
}
