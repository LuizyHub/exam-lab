package capstone.examlab.questions.dto.image;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class ImageSaveDto {
    private List<MultipartFile> images;
}