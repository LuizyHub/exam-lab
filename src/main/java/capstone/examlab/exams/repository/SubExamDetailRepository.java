package capstone.examlab.exams.repository;

import capstone.examlab.exams.entity.SubExamDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubExamDetailRepository extends JpaRepository<SubExamDetailEntity, Long> {
    SubExamDetailEntity findBySubExamTitle(String testSubExam);
}