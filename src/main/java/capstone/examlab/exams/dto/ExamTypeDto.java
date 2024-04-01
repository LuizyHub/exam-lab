package capstone.examlab.exams.dto;

import java.util.HashMap;
import java.util.Map;

public class ExamTypeDto extends HashMap<String, Object> {
    public ExamTypeDto(int initialCapacity, float loadFactor) {
        super(initialCapacity, loadFactor);
    }

    public ExamTypeDto(int initialCapacity) {
        super(initialCapacity);
    }

    public ExamTypeDto() {
    }

    public ExamTypeDto(Map<? extends String, ?> m) {
        super(m);
    }
}
