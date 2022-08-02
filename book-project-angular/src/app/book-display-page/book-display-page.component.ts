import { Component, OnInit } from '@angular/core';
import { Book } from '../data/book';

@Component({
  selector: 'book-display-page',
  templateUrl: './book-display-page.component.html',
  styleUrls: ['./book-display-page.component.scss']
})
export class BookDisplayPageComponent implements OnInit {

  books: Array<Book> = [];

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
        // console.log(result)
        if (result.items.length > 0) {
          for (let i = 0; i < result.items.length; i++) {
            let data = result.items[i].volumeInfo
            // console.log(data)
            this.books[i] = data
          }
        } else {
          console.log("Nothing to return.")
        }
      })
  }
}

