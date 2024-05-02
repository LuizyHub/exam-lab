package capstone.examlab.questions.dto;

import capstone.examlab.questions.dto.image.ImageDto;
import capstone.examlab.questions.entity.QuestionEntity;
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

    public static QuestionDto fromEntity(QuestionEntity entity) {
        return QuestionDto.builder()
                .id(entity.getId())
                .type(entity.getType())
                .question(entity.getQuestion())
                .questionImagesIn(entity.getQuestionImagesIn())
                .questionImagesOut(entity.getQuestionImagesOut())
                .options(entity.getOptions())
                .answers(entity.getAnswers())
                .commentary(entity.getCommentary())
                .commentaryImagesIn(entity.getCommentaryImagesIn())
                .commentaryImagesOut(entity.getCommentaryImagesOut())
                .tags(entity.getTagsMap())
                .build();
    }
}
