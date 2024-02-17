package capstone.examlab.exams.dto;


import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ExamDetail {
    private String title;
    private List<SubExamDetail> subExams = new ArrayList<>();
}