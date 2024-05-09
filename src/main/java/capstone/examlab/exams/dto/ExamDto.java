package capstone.examlab.exams.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExamDto {
    private String examTitle;
    private Long examId;
    private Integer size;
}