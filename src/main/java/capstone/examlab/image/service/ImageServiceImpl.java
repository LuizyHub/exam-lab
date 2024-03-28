package capstone.examlab.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService{

    private static String BUCKET_NAME = "examlab-image";
    private static String FOLDER_NAME = "test_images/";  //저장 폴더명 임시 부여
    //private static String FOLDER_NAME = "driver_images/"; //실제 사용 폴더명
    private final AmazonS3 amazonS3;

    @Transactional
    public String saveImageInS3(MultipartFile multipartImage){
        String originalName = multipartImage.getOriginalFilename();
        String accessUrl = ""; //반환 URL저장
        String filename = FOLDER_NAME+originalName;
        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartImage.getContentType());
            objectMetadata.setContentLength(multipartImage.getInputStream().available());

            amazonS3.putObject(BUCKET_NAME, filename, multipartImage.getInputStream(), objectMetadata);

            accessUrl = amazonS3.getUrl(BUCKET_NAME, filename).toString();
        } catch(IOException e) {

        }
        return accessUrl;
    }
}