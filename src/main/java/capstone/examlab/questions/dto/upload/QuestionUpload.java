package capstone.examlab.questions.dto.upload;

import capstone.examlab.image.dto.ImagesUploadInfo;
import capstone.examlab.questions.dto.ImageDto;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/*
    depricated: 문제들 단위가 아닌 문제 단위로 api호출해서 업로드하는 방식을 채택 -> 따라서 List형이 불필요해짐
 */


@Data
@Builder
public class QuestionUpload {

/*    private String uuid;
    private String type;
    private String question;
    private List<String> options;
    private List<Integer> answers;
    private String commentary;
    private Map<String, List<String>> tagsMap;*/
}