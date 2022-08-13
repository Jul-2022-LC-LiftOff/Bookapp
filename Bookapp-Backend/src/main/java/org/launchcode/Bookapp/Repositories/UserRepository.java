package org.launchcode.Bookapp.Repositories;

import org.launchcode.Bookapp.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);

}
