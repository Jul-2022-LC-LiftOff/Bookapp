import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from '../data/book';
import { currentbooks } from '../data/currentbook';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() emitBooks = new EventEmitter<Array<Book>>()
  books: Array<Book> = []
  constructor(private Router: Router) { }

  searchAll : Book []=currentbooks
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
            let id = result.items[i].id;
             console.log(data)
            this.books[i] = data
            this.books[i].id = id;
            currentbooks.push(data)
          }
         // this.emitBooks.emit(this.books)
         //this.searchAll=this.books
        //  console.log(currentbooks)
        this.Router.navigate(['/home']);
        } else {
          console.log("Nothing to return.")
        }
      })
  }

}
