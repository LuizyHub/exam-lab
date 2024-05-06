package capstone.examlab.ai.dto;

import capstone.examlab.questions.dto.update.QuestionUpdateDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class Question {
    // 문제
    private String question;

    // 보기
    private List<String> options;

    // 정답
    private List<Integer> answers;

    // 해설
    private String commentary;

    public static QuestionUpdateDto toQuestionUpdateDto(Question question) {
        return QuestionUpdateDto.builder()
                .question(question.getQuestion())
                .options(question.getOptions())
                .answers(question.getAnswers())
                .commentary(question.getCommentary())
                .build();
    }
}
