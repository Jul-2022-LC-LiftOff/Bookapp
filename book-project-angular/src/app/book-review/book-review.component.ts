import { Component, OnInit } from '@angular/core';
import { Book } from '../data/book';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.scss']
})
export class BookReviewComponent implements OnInit {


  books: Array<Book> = [];
  bookid;
  searchTerm;
  key = "AIzaSyAukQn7svQJN1ZruG8UK26I-LKr3lcEbGk";

  constructor(private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.bookid = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.bookid);
    this.searchTerm = this.bookid;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.searchTerm}&key=${this.key}`)
    
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

  

  // getBook(search) {
  //   let booksArr: Book[]
  //   let searchTerm = search.searchTerm
  //   let key = "AIzaSyAukQn7svQJN1ZruG8UK26I-LKr3lcEbGk"
  //   fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${key}`)
  //     .then(response => response.json())
  //     .then(result => {
  //       // console.log(result)
  //       if (result.items.length > 0) {
  //         for (let i = 0; i < result.items.length; i++) {
  //           let data = result.items[i].volumeInfo
  //           // console.log(data)
  //           this.books[i] = data
  //         }
  //       } else {
  //         console.log("Nothing to return.")
  //       }
  //     })
  // }

}
