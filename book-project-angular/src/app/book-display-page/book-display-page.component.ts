import { Component, OnInit } from '@angular/core';
import { Book } from '../data/book';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { currentbooks } from '../data/currentbook';

@Component({
  selector: 'book-display-page',
  templateUrl: './book-display-page.component.html',
  styleUrls: ['./book-display-page.component.scss']
})
export class BookDisplayPageComponent implements OnInit {

  books: Array<Book> = currentbooks;

  constructor() { }

  ngOnInit(): void {
    // this.getBook("harry+potter+and+the")
  }

  getBook(search) {
    let booksArr: Book[]
    let searchTerm = search.searchTerm
    let key = "AIzaSyAukQn7svQJN1ZruG8UK26I-LKr3lcEbGk"
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${key}`)
      .then(response => response.json())
      .then(result => {
        if (result.items.length > 0) {
          for (let i = 0; i < result.items.length; i++) {
            let data = result.items[i].volumeInfo;
            let id = result.items[i].id;
            this.books[i] = data;
            this.books[i].id = id;
          }
        } else {
          console.log("Nothing to return.")
        }
      })
  }
}

