package capstone.examlab.exams.repository;

import capstone.examlab.config.profile.ProfileJPA;
import capstone.examlab.exams.domain.ExamEntity;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

@Profile("jpa")
public interface ExamJpaRepository extends JpaRepository<ExamEntity, Long>, ExamRepository<ExamEntity> {
}