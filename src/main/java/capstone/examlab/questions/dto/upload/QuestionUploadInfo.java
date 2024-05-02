package capstone.examlab.questions.dto.upload;

import capstone.examlab.questions.dto.image.ImageDto;
import capstone.examlab.questions.documnet.Question;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class QuestionUploadInfo {
    private String type;
    private String question;
    private List<ImageDto> questionImagesTextIn;
    private List<ImageDto> questionImagesTextOut;
    private List<String> options;
    private List<Integer> answers;
    private String commentary;
    private List<ImageDto> commentaryImagesTextIn;
    private List<ImageDto> commentaryImagesTextOut;
    private Map<String, List<String>> tags;

    public void initializeCollections() {
        if (this.questionImagesTextIn == null) {
            this.questionImagesTextIn = new ArrayList<>();
        }
        if (this.questionImagesTextOut == null) {
            this.questionImagesTextOut = new ArrayList<>();
        }
        if (this.commentaryImagesTextIn == null) {
            this.commentaryImagesTextIn = new ArrayList<>();
        }
        if (this.commentaryImagesTextOut == null) {
            this.commentaryImagesTextOut = new ArrayList<>();
        }
        if (this.tags == null) {
            this.tags = new HashMap<>();
        }
    }

    public Question toDocument(Long examId, String uuid) {
        return Question.builder()
                .id(uuid)
                .examId(examId)
                .type(this.type)
                .question(this.question)
                .questionImagesIn(this.questionImagesTextIn)
                .questionImagesOut(this.questionImagesTextOut)
                .options(this.options)
                .answers(this.answers)
                .commentary(this.commentary)
                .commentaryImagesIn(this.commentaryImagesTextIn)
                .commentaryImagesOut(this.commentaryImagesTextOut)
                .tagsMap(this.tags)
                .build();
    }
}
