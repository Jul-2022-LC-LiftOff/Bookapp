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
  similerbooks: Array<Book> = [];
  bookid;
  searchTerm;
  key = "AIzaSyAukQn7svQJN1ZruG8UK26I-LKr3lcEbGk";

  constructor(private activatedRoute: ActivatedRoute) { }

  test(){
    console.log("test")
  }


  ngOnInit() {
    this.bookid = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.bookid);
    fetch(`https://www.googleapis.com/books/v1/volumes/${this.bookid}?key=${this.key}`)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
          this.books[0] = result.volumeInfo
          this.searchTerm = result.volumeInfo.authors
          console.log(this.searchTerm)
    })  
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.searchTerm}&key=${this.key}`)
    .then(response => response.json())
    .then(result => {
      if (result.items.length > 0) {
        for (let i = 0; i < result.items.length; i++) {
          let data = result.items[i].volumeInfo;
          let id = result.items[i].id;
          this.similerbooks[i] = data;
          this.similerbooks[i].id = id;
        }
    }
  })
}
}