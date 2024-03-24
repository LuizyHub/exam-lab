package capstone.examlab.user.repository;

import capstone.examlab.user.domain.User;
import capstone.examlab.user.domain.UserEntity;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Profile("jpa")
public interface UserJpaRepository extends JpaRepository<UserEntity, String>, UserRepository<UserEntity>{
}
