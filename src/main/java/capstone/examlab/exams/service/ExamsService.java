package capstone.examlab.exams.service;

import capstone.examlab.exams.dto.ExamList;
import capstone.examlab.exams.dto.ExamType;

public interface ExamsService {

    public ExamType getExamType(Long id);

    public ExamList getExamList();
}
