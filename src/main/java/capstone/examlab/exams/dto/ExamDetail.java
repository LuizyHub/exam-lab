package capstone.examlab.exams.dto;


import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Builder
@Data
public class ExamDetail {
    private String examTitle;
    private List<SubExamDetail> subExams = new ArrayList<>();
}