package capstone.examlab.questions.service;

import capstone.examlab.questions.dto.ImageSaveDto;

import java.util.List;

public interface ImageService {
    List<String> saveImagesInS3(ImageSaveDto imageSaveDto);

    void deleteImageInFolder(String imageName);
}