package capstone.examlab.questions.service;

import capstone.examlab.questions.dto.ImageSaveDto;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3ObjectSummary;
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

    private static String bucketName = "examlab-image";
    private static String folderName = "test_images/";  //저장 폴더명 임시 부여
    private final AmazonS3 amazonS3;

    //이미지 저장 로직
    @Transactional
    public List<String> saveImagesInS3(ImageSaveDto saveDto) {
        List<String> resultList = new ArrayList<>();

        for (int i = 0; i < saveDto.getImages().size(); i++) {
            String value = saveImage(saveDto.getImages().get(i));
            resultList.add(value);
        }
        return resultList;
    }

    @Transactional
    public String saveImage(MultipartFile multipartFile) {
        String originalName = multipartFile.getOriginalFilename();
        String accessUrl = ""; //반환 URL저장
        String filename = folderName+originalName;

        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());
            objectMetadata.setContentLength(multipartFile.getInputStream().available());

            amazonS3.putObject(bucketName, filename, multipartFile.getInputStream(), objectMetadata);

            accessUrl = amazonS3.getUrl(bucketName, filename).toString();
        } catch(IOException e) {

        }
        return accessUrl;
    }

    //이미지 삭제 로직
    public void deleteImageInFolder(String imageName) {
        imageName = folderName+imageName;
        amazonS3.deleteObject(new DeleteObjectRequest(bucketName, imageName));
    }
}