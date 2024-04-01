package capstone.examlab.exams.service;

import capstone.examlab.exams.dto.ExamAddDto;
import capstone.examlab.exams.dto.ExamPatchDto;
import capstone.examlab.exams.dto.ExamTypeDto;
import capstone.examlab.exams.dto.ExamDto;
import capstone.examlab.users.domain.User;

import java.util.List;

public interface ExamsService {

    public ExamTypeDto getExamType(Long id);

    public List<ExamDto> getExamList();

    Long createExam(ExamAddDto examAddDto, User user);

    public void deleteExam(Long id, User user);

    public void patchExam(Long id, ExamPatchDto examAddDto, User user);
}
