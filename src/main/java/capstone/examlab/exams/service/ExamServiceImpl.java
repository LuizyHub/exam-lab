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

    public QuestionsList getQuestionsList(long id, QuestionsOption questionsOption) {
        //새로운 시험지 생기면 조건 추가
        if(id == 1) return questionsService.findByDriverLicenseQuestions(questionsOption);
        return null;
    }

   /* @Override
    public QuestionsList getQuestionsList(QuestionsOption questionsOption) {
        QuestionsList questionsList = new QuestionsList();

        questionsList.add(Question.builder()
                .id(1L)
                .type("객관식")
                .question("1번 문제")
                .questionImageUrls(new ArrayList<String>() {{
                    add("1번 문제 이미지");
                }})
                .questionImageDescriptions(new ArrayList<String>() {{
                    add("1번 문제 이미지 설명");
                }})
                .options(new ArrayList<String>() {{
                    add("1번 답");
                    add("2번 답");
                    add("3번 답");
                    add("4번 답");
                }})
                .answers(new ArrayList<Integer>() {{
                    add(1);
                    add(3);
                }})
                .explanation("1번 문제 설명")
                .explanationImageUrls(new ArrayList<String>() {{
                    add("1번 문제 설명 이미지");
                }})
                .explanationImageDescriptions(new ArrayList<String>() {{
                    add("1번 문제 설명 이미지 설명");
                }})
                .tags(new ArrayList<String>() {{
                    add("표지");
                }})
                .build());

        questionsList.add(Question.builder()
                .id(2L)
                .type("객관식")
                .question("2번 문제")
                .questionImageUrls(new ArrayList<String>() {{
                    add("2번 문제 이미지");
                }})
                .questionImageDescriptions(new ArrayList<String>() {{
                    add("2번 문제 이미지 설명");
                }})
                .options(new ArrayList<String>() {{
                    add("1번 답");
                    add("2번 답");
                    add("3번 답");
                    add("4번 답");
                }})
                .answers(new ArrayList<Integer>() {{
                    add(2);
                    add(4);
                }})
                .explanation("2번 문제 설명")
                .explanationImageUrls(new ArrayList<String>() {{
                    add("2번 문제 설명 이미지");
                }})
                .explanationImageDescriptions(new ArrayList<String>() {{
                    add("2번 문제 설명 이미지 설명");
                }})
                .tags(new ArrayList<String>() {{
                    add("상황");
                }})
                .build());


        return questionsList;
    }*/
}
