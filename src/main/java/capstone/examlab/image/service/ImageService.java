package capstone.examlab.image.service;

import capstone.examlab.questions.dto.ImageSave;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {
    String saveImageInS3(MultipartFile imageFile);
}