package capstone.examlab.util;

public final class Util {

    private Util() {}

    public static boolean isSingleToken(String str) {
        if (!str.matches("^[a-zA-z가-힣0-9]+$")) return false;
        return true;
    }
}
