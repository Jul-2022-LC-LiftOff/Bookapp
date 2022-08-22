package org.launchcode.Bookapp.controllers;

import org.launchcode.Bookapp.Repositories.BookRepository;
import org.launchcode.Bookapp.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "book/search")
@ComponentScan()
public class SearchController {

    @Autowired
    private BookRepository bookRepository;

    @RequestMapping("")
    public String search(Model model) {
        model.addAttribute(new Book());
        return "search";
    }

    @PostMapping("results")
    public String displaySearchResults(Model model, @RequestParam String searchType, @RequestParam String searchTerm){
        Iterable<Book> books;
        if (searchTerm.toLowerCase().equals("all") || searchTerm.equals("")){
            books = bookRepository.findAll();
        } else {
          //  books = BookData.findByColumnAndValue(searchType, searchTerm, bookRepository.findAll());
        }
      //  model.addAttribute("columns", columnChoices);
       // model.addAttribute("title", "Jobs with " + columnChoices.get(searchType) + ": " + searchTerm);
       // model.addAttribute("jobs", jobs);

        return "search";
    }
}

