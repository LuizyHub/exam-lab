package capstone.examlab.user.repository;

import capstone.examlab.user.domain.User;

import java.util.Optional;

public interface UserRepository<T extends User> {

    T save(T user);

    Optional<T> findById(String id);

    Optional<T> findByUserId(String userId);
}
