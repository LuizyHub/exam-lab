package capstone.examlab.exams.domain;

import capstone.examlab.users.domain.User;
import jakarta.persistence.Entity;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@MappedSuperclass
public abstract class Exam {

    protected String examTitle;

    abstract public Long getExamId();

    abstract public void setExamId(Long examId);

    abstract public Map<String, List<String>> getTypes();

    abstract public void setTypes(Map<String, List<String>> types);

    abstract public User getUser();

    abstract public void setUser(User user);

    abstract public String getPdfUrl();

    abstract public void setPdfUrl(String pdfUrl);
}
