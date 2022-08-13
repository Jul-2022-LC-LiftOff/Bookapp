package org.launchcode.Bookapp.controllers;

import org.launchcode.Bookapp.Repositories.BookRepository;
import org.launchcode.Bookapp.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping(value = "/book")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

//    @Autowired
//    private LibraryRepository libraryRepository;
//    @Autowired
//    private AuthorRepository authorRepository;

    @GetMapping
    public String getBooks(Model model) {
        model.addAttribute("books", bookRepository.findAll());
        System.out.println( bookRepository.findAll());
        return "bookList";
    }

    // GET /book/new -> returns an HTML form
    @GetMapping(value = "/new")
    public String addBookForm(Model model) {
        model.addAttribute(new Book());
        //model.addAttribute("authors", authorRepository.findAll());
        return "addBook";
    }

    // POST /book/new
    @PostMapping(value = "/new")
    public String addBook(@ModelAttribute @Valid Book newBook, Errors errors, Model model) {

        if (errors.hasErrors()){
            return "addBook";
        }

        bookRepository.save(newBook);
        model.addAttribute("bookName", newBook.getTitle());
        return "bookList";
    }



}
