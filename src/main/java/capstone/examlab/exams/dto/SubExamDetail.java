package capstone.examlab.exams.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubExamDetail {
    private Long examId;
    private String subTitle;
}
