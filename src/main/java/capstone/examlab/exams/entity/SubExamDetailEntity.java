package capstone.examlab.exams.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Entity
@Data
public class SubExamDetailEntity {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examId;

    private String subExamTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_detail_id")
    private ExamDetailEntity examDetail;
}