package capstone.examlab.questions.dto.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
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

    public static QuestionsSearchDto fromParams(Map<String, List<String>> params) {
        Map<String, List<String>> tags = new HashMap<>();
        List<String> includes = new ArrayList<>();
        int count = 10;
        for (Map.Entry<String, List<String>> entry : params.entrySet()) {
            String key = entry.getKey();
            List<String> values = entry.getValue();
            if (key.startsWith("tags_")) {
                String[] tokens = key.split("_", 2);
                String category = tokens[1];
                tags.computeIfAbsent(category, k -> new ArrayList<>()).addAll(values);
            } else if (key.equals("includes")) {
                includes.addAll(values);
            } else if (key.equals("count")) {
                try {
                    count = Integer.parseInt(values.get(0));
                    if (count < 0) {
                        throw new IllegalArgumentException("Count 값은 0 이상이어야 합니다.");
                    }
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException("Count 값은 정수형이어야 합니다.");
                }
            }
        }

        return QuestionsSearchDto.builder()
                .tags(tags)
                .count(count)
                .includes(includes)
                .build();
    }
}
