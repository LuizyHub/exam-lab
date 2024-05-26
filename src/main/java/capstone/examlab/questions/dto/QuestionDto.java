package capstone.examlab.questions.dto;

import capstone.examlab.questions.dto.image.ImageDto;
import capstone.examlab.questions.documnet.Question;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class QuestionDto {
    private String id;
    private String type;
    private String question;
    private List<ImageDto> questionImagesIn;
    private List<ImageDto> questionImagesOut;
    private List<String> options;
    private List<Integer> answers;
    private String commentary;
    private List<ImageDto> commentaryImagesIn;
    private List<ImageDto> commentaryImagesOut;
    private Map<String, List<String>> tags;

    public static QuestionDto fromDocument(Question question) {
        return QuestionDto.builder()
                .id(question.getId())
                .type(question.getType())
                .question(question.getQuestion())
                .questionImagesIn(question.getQuestionImagesIn())
                .questionImagesOut(question.getQuestionImagesOut())
                .options(question.getOptions())
                .answers(question.getAnswers())
                .commentary(question.getCommentary())
                .commentaryImagesIn(question.getCommentaryImagesIn())
                .commentaryImagesOut(question.getCommentaryImagesOut())
                .tags(question.getTagsMap())
                .build();
    }
}
