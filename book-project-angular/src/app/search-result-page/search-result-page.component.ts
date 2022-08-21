import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
@Component({
  selector: 'search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements OnInit {

  books: Array<Book> = []

  constructor() { }

  ngOnInit(): void {
  }

  populateBooks(books: any) {
    this.books = books
  }

}
