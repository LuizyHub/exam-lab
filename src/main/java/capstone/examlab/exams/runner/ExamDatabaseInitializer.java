package capstone.examlab.exams.runner;

import capstone.examlab.exams.domain.Exam;
import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.users.domain.User;
import capstone.examlab.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

// application 실행 시 한번만 동작하는 초기화 클래스
@Slf4j
@Component
@RequiredArgsConstructor
public class ExamDatabaseInitializer implements ApplicationRunner {

    private final ObjectProvider<Exam> examProvider;
    private final ExamRepository examRepository;
    // 개발용 코드
//    private final UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) {
        // 데이터 베이스 초기화
//        examRepository.deleteAllInBatch();

        // 시험 데이터 생성
        Exam drivingLicenseExam = examProvider.getObject();
        drivingLicenseExam.setExamTitle("운전면허 - 1,2종");
        drivingLicenseExam.setTypes(Map.of("category", List.of("상황", "표지", "화물", "법")));

        try {
            drivingLicenseExam = examRepository.save(drivingLicenseExam);
        } catch (DuplicateKeyException e) {
            log.warn("Test Exam data already exists");
        }

        Exam englishSATExam = examProvider.getObject();
        englishSATExam.setExamTitle("수능 - 영어");
        englishSATExam.setTypes(Map.of(
                "연도", List.of("2024", "2023", "2022"),
                "월", List.of("6", "9", "11"),
                "분류", List.of("목적", "분위기심경", "대의파악", "함의추론", "도표이해", "내용일치", "실용문일치", "어법", "단어쓰임", "빈칸추론", "무관한문장", "글의순서", "문장넣기", "요약문완성"),
                "배점", List.of("2", "3")));

        // 개발용 코드
//        User user = (User) userRepository.findByUserId("lab3@gmail.com").get();
//        englishSATExam.setUser(user);

        try {
            englishSATExam = examRepository.save(englishSATExam);
        } catch (DuplicateKeyException e) {
            log.warn("Test Exam data already exists");
        }
    }
}
