package capstone.examlab.questions.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageDto {
    private String url;
    private String description;
    private String attribute;
}