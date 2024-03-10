package capstone.examlab.questions.entity;
import capstone.examlab.questions.dto.QuestionImage;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.List;

@NoArgsConstructor
@Data
@Document(indexName = "driver-question")
public class QuestionEntity {
    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String type;
    @Field(type = FieldType.Text)
    private String question;
    @Field(type = FieldType.Text)
    private List<String> options;
    @Field(type = FieldType.Object)
    private List<QuestionImage> questionImagesIn;
    @Field(type = FieldType.Object)
    private List<QuestionImage> questionImagesOut;
    @Field(type = FieldType.Keyword)
    private List<Integer> answers;
    @Field(type = FieldType.Text)
    private String commentary;
    @Field(type = FieldType.Object)
    private List<QuestionImage> commentaryImagesIn;
    @Field(type = FieldType.Object)
    private List<QuestionImage> commentaryImagesOut;
    @Field(type = FieldType.Text)
    private List<String> tags;
}
