package org.launchcode.Bookapp.controllers;

import org.launchcode.Bookapp.Repositories.UserRepository;
import org.launchcode.Bookapp.model.User;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@Controller
@RequestMapping("users")
public class UserRestController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    ObjectFactory<HttpSession> httpSessionFactory;

    @GetMapping("view/{userId}")
   public String displayViewUser(Model model){
        HttpSession session = httpSessionFactory.getObject();
        int userId = (Integer) session.getAttribute("user");
        //User testUser = userRepository.findByUsername("user1");
        Optional<User> testUser2 = userRepository.findById(userId);
        System.out.println(testUser2);
        if (testUser2.isPresent()) {
            User currentUser = (User) testUser2.get();
            System.out.println(currentUser.getBooks());
            model.addAttribute("user", currentUser);
            model.addAttribute("books",currentUser.getBooks());
            return "users/view";
        } else{
            return "redirect:../";
        }

    }
}
