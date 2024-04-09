package capstone.examlab.questions.dto;

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
}

