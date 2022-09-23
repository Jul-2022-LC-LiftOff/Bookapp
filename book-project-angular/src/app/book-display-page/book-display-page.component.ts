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
  bestsellers: Array<Book> = [];

  constructor() {
    this.bestsellers = []
  }

  ngOnInit(): void {
    // this.getBook("harry+potter+and+the")
    var bestsellersList = []
    const apiKey = "vgiERrlL7ZwvWt6hYEACYW9G2xVsIU9M"
    let isbns = []
    fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=' + apiKey,
      { method: 'get', })
      .then(response => {
        return response.json();
      }).then(json => {
        // console.log(json);
        json.results.forEach(function (book) {
          let isbnList = []
          var isbn = book.isbns[0].isbn10;
          // console.log(book.isbns)
          isbnList.push(isbn)
          for (let i in isbnList) {
            let searchTerm = isbnList[i]
            // console.log(i)
            let key = "AIzaSyAukQn7svQJN1ZruG8UK26I-LKr3lcEbGk"
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm} & key=${key}`)
              .then(response =>
                response.json()
              )
              .then(result => {
                // console.log(result)
                if (!result.error) {
                  let data = result.items[0].volumeInfo;
                  let id = result.items[0].id;
                  data.id = id
                  bestsellersList.push(data);
                  // console.log(bestsellersList)
                } else {
                  console.log("Nothing to return.")
                }
              })
          }
          // console.log(bestsellersList)
        });
        return bestsellersList
      }).then(() => {
        // console.log(bestsellersList)
        this.bestsellers = bestsellersList
      })
  }

  getBook(search) {
    let booksArr: Book[]
    let searchTerm = search.searchTerm
    let key = "AIzaSyAukQn7svQJN1ZruG8UK26I-LKr3lcEbGk"
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm} & key=${key}`)
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

