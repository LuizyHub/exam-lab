package capstone.examlab.exams.repository;

import capstone.examlab.exams.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Integer> {
}