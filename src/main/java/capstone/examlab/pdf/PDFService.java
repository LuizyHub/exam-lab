package capstone.examlab.pdf;

import org.springframework.web.multipart.MultipartFile;

public interface PDFService {
    String getTextFromPDF(MultipartFile pdfFile);
}
