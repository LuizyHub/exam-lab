package capstone.examlab.pdf;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class PDFServiceImpl implements PDFService {
    @Override
    public String getTextFromPDF(MultipartFile pdfFile) {
        try (PDDocument document = PDDocument.load(pdfFile.getInputStream())){
            PDFTextStripper textStripper = new PDFTextStripper();
            return textStripper.getText(document);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
