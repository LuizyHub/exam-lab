package capstone.examlab.exams.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class FileGetResponseDto {
    public static final FileGetResponseDto EMPTY = new FileGetResponseDto(false, null);
    private boolean isExist;
    private String fileTitle;
}
