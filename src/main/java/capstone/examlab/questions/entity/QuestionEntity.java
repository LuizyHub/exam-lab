package capstone.examlab.questions.entity;
import capstone.examlab.questions.dto.QuestionDto;
import capstone.examlab.questions.dto.image.ImageDto;
import capstone.examlab.questions.dto.upload.QuestionUploadInfo;
import capstone.examlab.questions.dto.ImageDto;
import capstone.examlab.questions.dto.QuestionDto;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.List;
import java.util.Map;

@Data
@Builder
@Document(indexName = "questions")
public class QuestionEntity {
    @Id
    private String id;
    @Field(type = FieldType.Text)
    private Long examId;
    @Field(type = FieldType.Keyword)
    private String type;
    @Field(type = FieldType.Text)
    private String question;
    @Field(type = FieldType.Text)
    private List<String> options;
    @Field(type = FieldType.Object)
    private List<ImageDto> questionImagesIn;
    @Field(type = FieldType.Object)
    private List<ImageDto> questionImagesOut;
    @Field(type = FieldType.Keyword)
    private List<Integer> answers;
    @Field(type = FieldType.Text)
    private String commentary;
    @Field(type = FieldType.Object)
    private List<ImageDto> commentaryImagesIn;
    @Field(type = FieldType.Object)
    private List<ImageDto> commentaryImagesOut;
    @Field(type = FieldType.Object)
    private Map<String, List<String>> tagsMap;

    public QuestionDto toDto() {
        return QuestionDto.builder()
                .id(this.id)
                .type(this.type)
                .question(this.question)
                .questionImagesIn(this.questionImagesIn)
                .questionImagesOut(this.questionImagesOut)
                .options(this.options)
                .answers(this.answers)
                .commentary(this.commentary)
                .commentaryImagesIn(this.commentaryImagesIn)
                .commentaryImagesOut(this.commentaryImagesOut)
                .tags(this.tagsMap)
                .build();
    }
}
