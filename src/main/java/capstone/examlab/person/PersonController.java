package capstone.examlab.person;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/people")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService service;

    @GetMapping
    public List<Person> findByName(@RequestParam String name) {
        return service.findByName(name);
    }

    @PostMapping
    public Person create(@RequestBody Person person) {
        return service.save(person);
    }
}
