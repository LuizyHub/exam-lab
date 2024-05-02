package capstone.examlab.questions.dto.update;

import capstone.examlab.questions.entity.QuestionEntity;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class QuestionUpdateDto {
    private String id;
    private String question;
    private List<String> options;
    private List<Integer> answers;
    private String commentary;
    private Map<String, List<String>> tags;

    //AI문제 QuestionUpadteDto -> Question
    public QuestionEntity toDocument(Long examId, String uuid, String type) {
        return QuestionEntity.builder()
                .id(uuid)
                .examId(examId)
                .type(type)
                .question(this.question)
                .questionImagesIn(new ArrayList<>())
                .questionImagesOut(new ArrayList<>())
                .options(this.options)
                .answers(this.answers)
                .commentary(this.commentary)
                .commentaryImagesIn(new ArrayList<>())
                .commentaryImagesOut(new ArrayList<>())
                .tagsMap(this.tags)
                .build();
    }

    //Question내용 덮어쓰기
    public QuestionEntity updateDocument(QuestionEntity question) {
        question.setQuestion(this.question);
        question.setOptions(this.options);
        question.setAnswers(this.answers);
        question.setCommentary(this.commentary);
        question.setTagsMap(this.tags);
        return question;
    }
}