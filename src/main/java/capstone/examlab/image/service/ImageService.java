package capstone.examlab.image.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String saveImageInS3(MultipartFile imageFile);
}