import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() emitBooks = new EventEmitter<Array<Book>>()
  books: Array<Book> = []
  constructor() { }

  ngOnInit(): void {
  }


  getBook(search) {
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
          this.emitBooks.emit(this.books)
        } else {
          console.log("Nothing to return.")
        }
      })
  }

}
