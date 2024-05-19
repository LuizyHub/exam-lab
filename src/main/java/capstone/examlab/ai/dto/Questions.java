package capstone.examlab.ai.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class Questions {

    @NotNull
    List<Question> questions;
}