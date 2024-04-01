package capstone.examlab.users.repository;

import capstone.examlab.config.profile.ProfileMongo;
import capstone.examlab.users.domain.UserDoc;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

@ProfileMongo
public interface UserMongoRepository extends MongoRepository<UserDoc, String>, UserRepository<UserDoc>{
}
