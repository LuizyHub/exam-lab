package capstone.examlab.user.repository;

import capstone.examlab.user.domain.UserDoc;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

@Profile("mongo")
public interface UserMongoRepository extends MongoRepository<UserDoc, String>, UserRepository<UserDoc>{
}
