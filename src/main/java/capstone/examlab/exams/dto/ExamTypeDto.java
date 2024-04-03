package capstone.examlab.exams.dto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExamTypeDto extends HashMap<String, List<String>> {
    public ExamTypeDto(int initialCapacity, float loadFactor) {
        super(initialCapacity, loadFactor);
    }

    public ExamTypeDto(int initialCapacity) {
        super(initialCapacity);
    }

    public ExamTypeDto() {
    }

    public ExamTypeDto(Map<? extends String, ? extends List<String>> m) {
        super(m);
    }
}
