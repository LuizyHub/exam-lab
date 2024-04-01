package capstone.examlab.exams.runner;

import capstone.examlab.exams.domain.Exam;
import capstone.examlab.exams.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

// application 실행 시 한번만 동작하는 초기화 클래스
@Component
@RequiredArgsConstructor
public class ExamDatabaseInitializer implements ApplicationRunner {

    private final ObjectProvider<Exam> examProvider;
    private final ExamRepository examRepository;
//    private final SubExamRepository subExamRepository;
    @Override
    public void run(ApplicationArguments args) {
        // 데이터 베이스 초기화
        examRepository.deleteAllInBatch();

        // 시험 데이터 생성
        Exam drivingLicenseExam = examProvider.getObject();
        drivingLicenseExam.setExamTitle("운전면허 - 1,2종");
        drivingLicenseExam.setTypes(Map.of("tags", List.of("상황", "표지", "화물", "법")));

        drivingLicenseExam = examRepository.save(drivingLicenseExam);

        Exam EnglishSATExam = examProvider.getObject();
        EnglishSATExam.setExamTitle("수능 - 영어");
        EnglishSATExam.setTypes(Map.of("tags", List.of("문법", "독해", "어휘", "듣기")));

        examRepository.save(drivingLicenseExam);
    }
}
