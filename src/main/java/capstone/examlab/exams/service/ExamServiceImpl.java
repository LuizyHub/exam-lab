package capstone.examlab.exams.service;

import capstone.examlab.exams.dto.*;
import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.exams.repository.SubExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamsService {
    private final ExamRepository examRepository;
    private final SubExamRepository subExamRepository;

    @Override
    public ExamType getExamType(Long id) {
        // id 검증은 이미 controller에서 수행하므로 생략
        // get()으로 가져오는 것은 Optional이기 때문에 null이 아님을 보장
        Map<String, List<String>> types = subExamRepository.findById(id).get().getTypes();

        return new ExamType(types);
    }

    @Override
    public ExamList getExamList() {
        ExamList examList = new ExamList();
        examRepository.findAll()
                .forEach(exam -> {
                    examList.add(ExamDetail.builder()
                            .examTitle(exam.getExamTitle())
                            .subExams(exam.getSubExams().stream()
                                    .map(subExam -> SubExamDetail.builder()
                                            .examId(subExam.getSubExamId())
                                            .subTitle(subExam.getSubExamTitle())
                                            .build())
                                    .toList())
                            .build());
                });
        return examList;
    }
}
