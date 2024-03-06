package capstone.examlab.exams.repository;

import capstone.examlab.exams.entity.SubExam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubExamRepository extends JpaRepository<SubExam, Long> {
}