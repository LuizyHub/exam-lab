package capstone.examlab.exhandler.advice;

import capstone.examlab.ResponseDto;
import capstone.examlab.exhandler.exception.NotFoundQuestionException;
import capstone.examlab.exhandler.exception.UnauthorizedException;
import jdk.jshell.spi.ExecutionControl;
import org.apache.coyote.BadRequestException;
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

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public ResponseDto badRequestExHandler(BadRequestException e) {
            return ResponseDto.BAD_REQUEST;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundQuestionException.class)
    public ResponseDto notFoundExHandler(NotFoundQuestionException e) {
        return ResponseDto.NOT_FOUND;
    }
}
