package capstone.examlab.exams.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

//ExamList하위에

@Entity
@Data
public class ExamDetailEntity {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String examTitle;

    @OneToMany(mappedBy = "examDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubExamDetailEntity> subExams = new ArrayList<>();
}