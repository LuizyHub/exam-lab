package capstone.examlab.ai;

import capstone.examlab.ai.dto.Questions;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface AiService {
    public Questions generateQuestions(String content) throws JsonProcessingException;
}
