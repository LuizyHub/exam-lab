package capstone.examlab.exams.runner;

import capstone.examlab.exams.entity.Exam;
import capstone.examlab.exams.entity.SubExam;
import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.exams.repository.SubExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

// application 실행 시 한번만 동작하는 초기화 클래스
@Component
@RequiredArgsConstructor
public class ExamDatabaseInitializer implements ApplicationRunner {

    private final ExamRepository examRepository;
    private final SubExamRepository subExamRepository;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 데이터 베이스 초기화
        examRepository.deleteAllInBatch();
        subExamRepository.deleteAllInBatch();

        // 시험 데이터 생성
        Exam drivingLicenseExam = new Exam();
        drivingLicenseExam.setExamTitle("운전면허");

        drivingLicenseExam = examRepository.save(drivingLicenseExam);

        // 부시험 데이터 생성
        SubExam subExam = new SubExam();
        subExam.setSubExamTitle("1종, 2종");
        subExam.setTypes(Map.of("tags", List.of("상황", "표지", "화물", "법")));
        subExam = subExamRepository.save(subExam);

        // 시험과 부시험 관계
        drivingLicenseExam.getSubExams().add(subExam);
        subExam.setExam(drivingLicenseExam);

        examRepository.save(drivingLicenseExam);
    }
}
