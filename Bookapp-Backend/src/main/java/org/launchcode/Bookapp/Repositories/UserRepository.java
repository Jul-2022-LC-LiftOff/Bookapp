package org.launchcode.Bookapp.Repositories;

import org.launchcode.Bookapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("http://localhost:4200")
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

}
