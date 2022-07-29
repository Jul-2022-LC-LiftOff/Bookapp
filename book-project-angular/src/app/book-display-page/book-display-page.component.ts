import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'book-display-page',
  templateUrl: './book-display-page.component.html',
  styleUrls: ['./book-display-page.component.scss']
})
export class BookDisplayPageComponent implements OnInit {

  book: object;

  constructor() { }

  ngOnInit(): void {
  }


  // getBook(searchterm: | string,) {
  //   response = fetch("https://www.googleapis.com/books/v1/volumes?q=${searchterm}&key=your-API-key")
  //     .then(response => response.json())
  //     .then(result => {
  //       this.setState({ books: result.items })
  //     })
  // }
  // }
}

