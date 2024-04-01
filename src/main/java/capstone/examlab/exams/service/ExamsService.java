package capstone.examlab.exams.service;

import capstone.examlab.exams.dto.ExamTypeDto;
import capstone.examlab.exams.dto.ExamDto;

import java.util.List;

public interface ExamsService {

    public ExamTypeDto getExamType(Long id);

    public List<ExamDto> getExamList();
}
