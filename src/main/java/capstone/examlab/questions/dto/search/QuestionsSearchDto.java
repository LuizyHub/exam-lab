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
public class QuestionsSearchDto {
    private  Map<String, List<String>> tags;
    private Integer count;
    private List<String> includes;
}
