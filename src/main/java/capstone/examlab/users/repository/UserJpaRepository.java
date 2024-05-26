package capstone.examlab.users.repository;

import capstone.examlab.users.domain.UserEntity;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

@Profile("jpa")
public interface UserJpaRepository extends JpaRepository<UserEntity, String>, UserRepository<UserEntity>{
}
