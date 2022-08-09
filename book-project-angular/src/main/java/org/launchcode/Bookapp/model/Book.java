package org.launchcode.Bookapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;


@Entity
public class Book {

    @Id
    @GeneratedValue
    private int id;

    @NotBlank
    @Size(min = 1, max = 100)
    private String name;
    @NotBlank
    @Size(min = 1, max = 300)
    private String description;
    @NotBlank
    private Date publishedDate;
    @NotBlank
    private String publisher;

    @NotBlank
    private int isbn;

    public Book(){}

    public Book(int id, String name, String description, Date publishedDate, String publisher, int isbn) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.publishedDate = publishedDate;
        this.publisher = publisher;
        this.isbn = isbn;
    }


}
