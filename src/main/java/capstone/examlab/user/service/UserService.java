package capstone.examlab.user.service;

import capstone.examlab.user.domain.User;
import capstone.examlab.user.dto.UserAddDto;
import capstone.examlab.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final ObjectProvider<User> userProvider;

    private final UserRepository userRepository;


    public void addUser(UserAddDto userAddDto) {
        User user = userProvider.getObject();

        user.setUserId(userAddDto.getUserId());
        user.setName(userAddDto.getName());
        user.setPassword(userAddDto.getPassword());

        userRepository.save(user);
    }

    public Optional<User> findUserById(String userId) {
        return userRepository.findByUserId(userId);
    }

    public boolean isUserIdExist(String userId) {
        return userRepository.findByUserId(userId).isPresent();
    }


}
