package capstone.examlab.questions.dto.update;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class QuestionUpdateDto {
    private String id;
    private String question;
    private List<String> options;
    private List<Integer> answers;
    private String commentary;
    private Map<String, List<String>> tagsMap;
}