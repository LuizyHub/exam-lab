package capstone.examlab.workbooks.repository;

import capstone.examlab.workbooks.domain.Workbook;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkbookRepository extends MongoRepository<Workbook, String> {
    List<Workbook> findAllByUserId(String userId);
}
