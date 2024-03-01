package capstone.examlab.questions.entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.List;

@NoArgsConstructor
@Data
@Document(indexName = "driver-quiz")
public class QuestionEntity {
    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String type;
    @Field(type = FieldType.Text)
    private String question;
    @Field(type = FieldType.Text)
    private List<String> options;
    @Field(type = FieldType.Text)
    private List<String> questionImageUrls;
    @Field(type = FieldType.Text)
    private List<String> questionImageDescriptions;
    @Field(type = FieldType.Keyword)
    private List<Integer> answers;
    @Field(type = FieldType.Text)
    private String commentary;
    @Field(type = FieldType.Text)
    private List<String> commentaryImageUrls;
    @Field(type = FieldType.Text)
    private List<String> commentaryImageDescriptions;
    @Field(type = FieldType.Text)
    private List<String> tags;
}