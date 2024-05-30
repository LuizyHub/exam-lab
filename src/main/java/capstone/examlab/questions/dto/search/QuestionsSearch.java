package capstone.examlab.questions.dto.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionsSearch {
    private  Map<String, List<String>> tagsMap;
    @Builder.Default
    private Integer count = 10;
    private List<String> includes;
}
