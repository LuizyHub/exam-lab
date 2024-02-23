package capstone.examlab.exams.repository;

import capstone.examlab.exams.entity.ExamDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamDetailRepository extends JpaRepository<ExamDetailEntity, Integer> {
    ExamDetailEntity findByExamTitle(String testExam);
}