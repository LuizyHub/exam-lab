package capstone.examlab.exams.service;

import capstone.examlab.exams.dto.*;
import capstone.examlab.questions.service.QuestionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamsService {
    private final QuestionsService questionsService;

    @Override
    public ExamType getExamType(Long id) {
        ExamType examType = new ExamType();

        List<String> tagList = new ArrayList<>();
        tagList.add("상황");
        tagList.add("표지");
        examType.put("tags", tagList);

        return examType;
    }

    @Override
    public ExamList getExamList() {
        ExamList examList = new ExamList();

        ExamDetail examDetail1 = new ExamDetail();
        examDetail1.setTitle("운전면허");
        examDetail1.getSubExams().add(SubExamDetail.builder()
                .examId(1L)
                .subTitle("1종")
                .build());
        examDetail1.getSubExams().add(SubExamDetail.builder()
                .examId(2L)
                .subTitle("2종")
                .build());
        examList.add(examDetail1);

        ExamDetail examDetail2 = new ExamDetail();
        examDetail2.setTitle("수능");
        examDetail2.getSubExams().add(SubExamDetail.builder()
                .examId(3L)
                .subTitle("수학")
                .build());
        examDetail2.getSubExams().add(SubExamDetail.builder()
                .examId(4L)
                .subTitle("영어")
                .build());
        examList.add(examDetail2);

        return examList;
    }
}
