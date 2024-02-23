package capstone.examlab.exams.repository;

import capstone.examlab.exams.entity.ExamDetailEntity;
import capstone.examlab.exams.entity.SubExamDetailEntity;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ExamsRepositoryTest {

    @Autowired
    private ExamDetailRepository examDetailRepository;

    @Autowired
    private SubExamDetailRepository subExamDetailRepository;

    @AfterEach
    public void tearDown() {
        // 데이터 전체 삭제, 따라서 초반 테스트용도에만 사용할 것!!
        subExamDetailRepository.deleteAll();
        examDetailRepository.deleteAll();
    }

    @Test
    public void testInsertlData() {
        // 데이터 삽입
        ExamDetailEntity examDetail = new ExamDetailEntity();
        examDetail.setExamTitle("운전면허");
        examDetailRepository.save(examDetail);

        SubExamDetailEntity subExamDetail = new SubExamDetailEntity();
        subExamDetail.setSubExamTitle("1종");
        subExamDetail.setExamDetail(examDetail);
        subExamDetailRepository.save(subExamDetail);

        // 데이터 조회 및 확인
        ExamDetailEntity savedExamDetail = examDetailRepository.findByExamTitle("운전면허");
        assertThat(savedExamDetail).isNotNull();
        assertThat(savedExamDetail.getExamTitle()).isEqualTo("운전면허");

        SubExamDetailEntity savedSubExamDetail = subExamDetailRepository.findBySubExamTitle("1종");
        assertThat(savedSubExamDetail).isNotNull();
        assertThat(savedSubExamDetail.getSubExamTitle()).isEqualTo("1종");
    }
}
