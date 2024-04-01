package capstone.examlab.exams.service;

import capstone.examlab.exams.dto.*;
import capstone.examlab.exams.repository.ExamRepository;
import capstone.examlab.valid.ValidExamId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamsService {
    private final ExamRepository examRepository;

    @Override
    public ExamTypeDto getExamType(@ValidExamId Long id) {
        // id 검증은 이미 controller에서 수행하므로 생략
        // get()으로 가져오는 것은 Optional이기 때문에 null이 아님을 보장
        Map<String, List<String>> types = examRepository.findById(id).get().getTypes();

        return new ExamTypeDto(types);
    }

    @Override
    public List<ExamDto> getExamList() {
        List<ExamDto> examList = new ArrayList<>();
        examRepository.findAll()
                .forEach(exam -> {
                    examList.add(ExamDto.builder()
                            .examTitle(exam.getExamTitle())
                            .examId(exam.getExamId())
                            .build());
                });
        return examList;
    }
}
