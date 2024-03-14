package capstone.examlab.exams.repository;

import capstone.examlab.exams.entity.Exam;
import capstone.examlab.exams.entity.SubExam;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
@Tag("db_test")
class SubExamRepositoryTest {

    @Autowired
    private SubExamRepository subExamRepository;

    private Exam exam;

    @BeforeEach
    void setUp() {
        exam = new Exam();
        exam.setExamTitle("시험테스트코드제목");
        exam.setExamId(1L);
    }

    // types 필드의 저장 확인
    @Test
    void typesFieldTest() {
        // given
        SubExam subExam = new SubExam();
        subExam.setSubExamTitle("1종, 2종");
        subExam.setExam(exam);

        // when
        Map<String, List<String>> types = Map.of("tags", List.of("상황", "표지"));
        subExam.setTypes(types);
        subExam = subExamRepository.save(subExam);
        SubExam subExamFromRepository = subExamRepository.findById(subExam.getSubExamId()).get();

        // then
        assertEquals(types, subExamFromRepository.getTypes());
    }

    // types 필드의 업데이트 확인
    @Test
    void typesFieldUpdateTest() {
        // given
        SubExam subExam = new SubExam();
        subExam.setSubExamTitle("1종, 2종");
        subExam.setExam(exam);
        subExam.setTypes(Map.of("tags", List.of("상황", "표지")));
        subExam = subExamRepository.save(subExam);

        // when
        SubExam subExamFromRepository = subExamRepository.findById(subExam.getSubExamId()).get();
        Map<String, List<String>> types = subExamFromRepository.getTypes();
        types.put("tags", List.of("상황", "표지", "도로"));
        types.put("level", List.of("1", "2", "3"));
        subExamFromRepository.setTypes(types);
        subExamRepository.save(subExamFromRepository);
        SubExam subExamUpdated = subExamRepository.findById(subExam.getSubExamId()).get();

        // then
        assertEquals(types, subExamUpdated.getTypes());

    }
}