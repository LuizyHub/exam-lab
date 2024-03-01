package capstone.examlab.exams.service;

import capstone.examlab.exams.dto.ExamList;
import capstone.examlab.exams.dto.ExamType;
import capstone.examlab.exams.dto.QuestionsList;
import capstone.examlab.exams.dto.QuestionsOption;

public interface ExamsService {

    public ExamType getExamType(Long id);

    public ExamList getExamList();

    public QuestionsList getQuestionsList(long id, QuestionsOption questionsOption);
}
