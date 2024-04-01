package capstone.examlab.exams.repository;

import capstone.examlab.config.ProfileJPA;
import capstone.examlab.exams.domain.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

@ProfileJPA
public interface ExamRepository extends JpaRepository<Exam, Long> {
}