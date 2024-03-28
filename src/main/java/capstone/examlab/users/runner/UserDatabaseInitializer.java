package capstone.examlab.users.runner;

import capstone.examlab.users.domain.User;
import capstone.examlab.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserDatabaseInitializer implements ApplicationRunner {

    private final ObjectProvider<User> userProvider;
    private final UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        try {
            User user1 = userProvider.getObject();
            user1.setUserId("lab1@gmail.com");
            user1.setName("lab1");
            user1.setPassword("lab111!");

            userRepository.save(user1);
        } catch (DuplicateKeyException e) {
            log.error("User data already exists");
        }

        try {
            User user2 = userProvider.getObject();
            user2.setUserId("lab2@gmail.com");
            user2.setName("lab2");
            user2.setPassword("lab222!");

            userRepository.save(user2);
        } catch (DuplicateKeyException e) {
            log.error("User data already exists");
        }

        try {
            User user3 = userProvider.getObject();
            user3.setUserId("lab3@gmail.com");
            user3.setName("lab3");
            user3.setPassword("lab333!");

            userRepository.save(user3);
        } catch (DuplicateKeyException e) {
            log.error("User data already exists");
        }
    }
}
