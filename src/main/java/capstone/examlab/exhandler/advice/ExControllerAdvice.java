package capstone.examlab.exhandler.advice;

import capstone.examlab.ResponseDto;
import capstone.examlab.exhandler.ErrorResult;
import capstone.examlab.exhandler.exception.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExControllerAdvice {
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseDto unauthorizedExHandler(UnauthorizedException e) {
        return ResponseDto.UNAUTHORIZED;
    }
}
