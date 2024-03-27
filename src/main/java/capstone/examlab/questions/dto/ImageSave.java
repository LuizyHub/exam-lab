package capstone.examlab.questions.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class ImageSave {
    private List<MultipartFile> images;
}