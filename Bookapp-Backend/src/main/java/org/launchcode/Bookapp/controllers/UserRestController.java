package org.launchcode.Bookapp.controllers;

import org.launchcode.Bookapp.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserRestController {
    @Autowired
    private UserRepository userRepository;

//    @GetMapping("/users")
//    public List<User> getUsers(){
//        return userRepository;
//    }
}
