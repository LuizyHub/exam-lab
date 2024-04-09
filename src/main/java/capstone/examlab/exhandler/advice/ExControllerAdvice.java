package capstone.examlab.exhandler.advice;

import capstone.examlab.exhandler.ErrorResult;
import capstone.examlab.exhandler.exception.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExControllerAdvice {
    private static final String ERROR_MESSAGE_BAD_REQUEST = "bad request";
    private static final String ERROR_MESSAGE_SERVER_ERROR = "server error";

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseDto unauthorizedExHandler(UnauthorizedException e) {
        return ResponseDto.UNAUTHORIZED;
    public ErrorResult unauthorizedExHandler(UnauthorizedException e) {
        return new ErrorResult((HttpStatus.INTERNAL_SERVER_ERROR.value())+"", e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public ErrorResult badRequestExHandler(BadRequestException e) {
        return new ErrorResult((HttpStatus.BAD_REQUEST.value())+"", ERROR_MESSAGE_BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MissingServletRequestPartException.class)
    public ErrorResult handleMissingServletRequestPartException(MissingServletRequestPartException e) {
        return new ErrorResult((HttpStatus.BAD_REQUEST.value()) + "", ERROR_MESSAGE_BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(InvalidContentTypeException.class)
    public ErrorResult handleInvalidContentTypeException(InvalidContentTypeException ex) {
        return new ErrorResult((HttpStatus.BAD_REQUEST.value()) + "", ERROR_MESSAGE_BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(InternalError.class)
    public ErrorResult internalServerErrorHandler(Exception e) {
        return new ErrorResult((HttpStatus.INTERNAL_SERVER_ERROR.value())+"", ERROR_MESSAGE_SERVER_ERROR);
    }
}
