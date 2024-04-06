package capstone.examlab.questions.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class ImageDto {
    private String url;
    private String description;
    private String attribute;
}