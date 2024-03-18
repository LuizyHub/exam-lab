package capstone.examlab.exams.dto;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ExamDetail {
    private String examTitle;
    private List<SubExamDetail> subExams;
}