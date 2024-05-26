package capstone.examlab.exams.repository;

import capstone.examlab.exams.domain.ExamDoc;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

@Profile("mongo")
public interface ExamMongoRepository extends MongoRepository<ExamDoc, String>, ExamRepository<ExamDoc> {
}
