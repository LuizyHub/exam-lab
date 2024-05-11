package capstone.examlab.util;

public final class Util {

    private Util() {}

    public static boolean isSingleToken(String str) {
        return str.matches("^[a-zA-Z가-힣0-9]+$");
    }
    public static boolean isSingleTokenWithUnderscore(String str) {
        return str.matches("^[a-zA-Z가-힣0-9_]+$");
    }
}
