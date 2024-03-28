package capstone.examlab.questions.dto.upload;

import capstone.examlab.questions.dto.ImageDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class QuestionUploadInfo {
    private String type;
    private String question;
    private List<ImageDto> questionImagesTextIn;
    private List<ImageDto> questionImagesTextOut;
    private List<String> options;
    private List<Integer> answers;
    private String commentary;
    private List<ImageDto> commentaryImagesTextIn;
    private List<ImageDto> commentaryImagesTextOut;
    private Map<String, List<String>> tagsMap;
}