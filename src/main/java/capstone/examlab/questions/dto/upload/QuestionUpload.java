package capstone.examlab.questions.dto.upload;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class QuestionUpload {
    private String uuid;
    private String type;
    private String question;
    private List<String> options;
    private List<Integer> answers;
    private String commentary;
    private Map<String, List<String>> tagsMap;
}