package capstone.examlab.questions.dto;

import capstone.examlab.valid.ValidTags;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.*;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionsOption {
    //tag에 정규식과 notempty넣어줘야함
    @ValidTags
    private List<String> tags;

    @Builder.Default
    @Positive
    private Integer count = 10;

    @Pattern(regexp = "^[a-zA-z가-힣0-9]+$", message = "검색은 허용되는 문자 내에서 입력해주세요.")
    @Size(min=2, max = 10, message = "검색은 최소 2자 이상 10자 이하로 입력해주세요.")
    private String includes;
}
