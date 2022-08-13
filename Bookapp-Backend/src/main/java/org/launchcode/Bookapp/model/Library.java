//package org.launchcode.Bookapp.model;
//
//import javax.persistence.Entity;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.validation.constraints.NotNull;
//
//@Entity
//public class Library extends AbstractEntity{
//
//    @ManyToOne
//    @NotNull
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @ManyToOne
//    @NotNull
//    @JoinColumn(name = "book_id")
//   private Book books;
//
//    private int rating;
//
//    public Library(){}
//
//    public Library(User user, Book books) {
//        this.user = user;
//        this.books = books;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public Book getBooks() {
//        return books;
//    }
//
//    public int getRating() {
//        return rating;
//    }
//
//    public void setBooks(Book books) {
//        this.books = books;
//    }
//
//    public void setRating(int rating) {
//        this.rating = rating;
//    }
//}
