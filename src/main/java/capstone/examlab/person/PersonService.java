package capstone.examlab.person;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonRepository repository;

    public List<Person> findByName(String name) {
        return repository.findByName(name);
    }

    public Person save(Person person) {
        return repository.save(person);
    }
}
