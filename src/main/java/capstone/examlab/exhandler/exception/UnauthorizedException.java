package capstone.examlab.exhandler.exception;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException() {
        super("Unauthorized: Access is denied.");
    }

    public UnauthorizedException(String message) {
        super(message);
    }
}
