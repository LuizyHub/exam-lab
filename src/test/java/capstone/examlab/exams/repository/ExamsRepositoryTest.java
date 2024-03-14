package capstone.examlab.exams.repository;

import capstone.examlab.exams.entity.Exam;
import capstone.examlab.exams.entity.SubExam;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@Tag("db_test")
public class ExamsRepositoryTest {

    @Autowired
    private ExamRepository examDetailRepository;

    @Autowired
    private SubExamRepository subExamDetailRepository;

    @Test
    public void testInsertlData() throws Exception {
//        // 데이터 삽입
//        Exam examDetail = new Exam();
//        examDetail.setExamTitle("운전면허");
//        examDetailRepository.save(examDetail);
//
//        SubExam subExamDetail = new SubExam();
//        subExamDetail.setSubExamTitle("1종");
//        subExamDetail.setExamDetail(examDetail);
//        subExamDetailRepository.save(subExamDetail);
//
//        // 데이터 조회 및 확인
//        Exam savedExamDetail = examDetailRepository.findByExamTitle("운전면허");
//        assertThat(savedExamDetail).isNotNull();
//        assertThat(savedExamDetail.getExamTitle()).isEqualTo("운전면허");
//
//        SubExam savedSubExamDetail = subExamDetailRepository.findBySubExamTitle("1종");
//        assertThat(savedSubExamDetail).isNotNull();
//        assertThat(savedSubExamDetail.getSubExamTitle()).isEqualTo("1종");
    }
}