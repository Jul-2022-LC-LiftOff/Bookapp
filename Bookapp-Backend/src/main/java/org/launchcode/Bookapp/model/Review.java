package org.launchcode.Bookapp.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Review extends AbstractEntity {

    private String review;
    private int reviewScore;

    @ManyToOne
    @JoinColumn(name="book_id")
    private Book book;
}
