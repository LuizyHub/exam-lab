package capstone.examlab.image.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class ImagesUploadInfo {
    private List<MultipartFile> imageFiles;
    private List<String> questionsUuid;
    private List<String> descriptions;
    private List<String> attributes;
    private List<String> imagesType;
}