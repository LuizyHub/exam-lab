package capstone.examlab.image.service;

import capstone.examlab.questions.dto.ImageSave;

import java.util.List;

public interface ImageService {
    List<String> saveImagesInS3(ImageSave imageSave);

    void deleteImageInFolder(String imageName);
}