package capstone.examlab;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@RequiredArgsConstructor
public class ResponseDto {
    private final Integer code;
    private final String message;

    public static ResponseDto of(Integer code, String message) {
        return new ResponseDto(code, message);
    }

    public static final ResponseDto OK = new ResponseDto(200, "OK");
    public static final ResponseDto CREATED = new ResponseDto(201, "CREATED");
    public static final ResponseDto BAD_REQUEST = new ResponseDto(400, "BAD_REQUEST");
    public static final ResponseDto UNAUTHORIZED = new ResponseDto(401, "UNAUTHORIZED");
    public static final ResponseDto NOT_FOUND = new ResponseDto(404, "NOT_FOUND");
}
