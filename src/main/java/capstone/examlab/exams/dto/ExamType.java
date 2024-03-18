package capstone.examlab.exams.dto;

import java.util.HashMap;
import java.util.Map;

public class ExamType extends HashMap<String, Object> {
    public ExamType(int initialCapacity, float loadFactor) {
        super(initialCapacity, loadFactor);
    }

    public ExamType(int initialCapacity) {
        super(initialCapacity);
    }

    public ExamType() {
    }

    public ExamType(Map<? extends String, ?> m) {
        super(m);
    }
}
