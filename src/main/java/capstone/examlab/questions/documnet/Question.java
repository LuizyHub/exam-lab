package capstone.examlab.questions.documnet;
import capstone.examlab.questions.dto.image.ImageDto;
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
public class Question {
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
}
