package capstone.examlab.exams.repository;

import capstone.examlab.exams.domain.Exam;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
@Tag("db_test")
class ExamRepositoryTest {

    @Autowired
    private ObjectProvider<Exam> examProvider;

    @Autowired
    private ExamRepository examRepository;

    // types 필드의 저장 확인
    @Test
    void typesFieldTest() {
        // given
        Exam exam = examProvider.getObject();
        exam.setExamTitle("운전면허 - 1종, 2종");

        // when
        Map<String, List<String>> types = Map.of("tags", List.of("상황", "표지"));
        exam.setTypes(types);
        exam = examRepository.save(exam);
        Exam subExamFromRepository = examRepository.findById(exam.getExamId()).get();

        // then
        assertEquals(types, subExamFromRepository.getTypes());
    }

    // types 필드의 업데이트 확인
    @Test
    void typesFieldUpdateTest() {
        // given
        Exam exam = new Exam();
        exam.setExamTitle("운전면허 - 1종, 2종");
        exam.setTypes(Map.of("tags", List.of("상황", "표지")));
        exam = examRepository.save(exam);

        // when
        Exam subExamFromRepository = examRepository.findById(exam.getExamId()).get();
        Map<String, List<String>> types = subExamFromRepository.getTypes();
        types.put("tags", List.of("상황", "표지", "도로"));
        types.put("level", List.of("1", "2", "3"));
        subExamFromRepository.setTypes(types);
        examRepository.save(subExamFromRepository);
        Exam subExamUpdated = examRepository.findById(exam.getExamId()).get();

        // then
        assertEquals(types, subExamUpdated.getTypes());
    }
}