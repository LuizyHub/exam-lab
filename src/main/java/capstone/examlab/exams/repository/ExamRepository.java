package capstone.examlab.exams.repository;

import capstone.examlab.exams.domain.Exam;

import java.util.List;
import java.util.Optional;

public interface ExamRepository<T extends Exam> {

    Exam save(T exam);

    Optional<T> findByExamId(Long id);

    List<T> findAll();

    boolean existsByExamId(Long id);

    void delete(T exam);
}
