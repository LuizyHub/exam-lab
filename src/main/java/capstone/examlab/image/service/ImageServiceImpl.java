package capstone.examlab.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService{
    private static String BUCKET_NAME = "examlab-image";
    
    private final AmazonS3 amazonS3;

    @Value("${spring.s3.profile.active}")
    private String folderName;

    @Transactional
    public String saveImageInS3(MultipartFile multipartImage){
        String originalName = multipartImage.getOriginalFilename();
        String accessUrl = ""; //반환 URL저장
        String filename = folderName+originalName;
        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartImage.getContentType());
            objectMetadata.setContentLength(multipartImage.getInputStream().available());

            amazonS3.putObject(BUCKET_NAME, filename, multipartImage.getInputStream(), objectMetadata);

            accessUrl = amazonS3.getUrl(BUCKET_NAME, filename).toString();
        } catch(IOException e) {
            log.error("saveImageInS3 error = {}", e);
        }
        return accessUrl;
    }
}