import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../data/book';
@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Output() emitBooks = new EventEmitter<any>();
  books: Array<Book>
  loginClicked: boolean;
  loggedIn: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  onLoginClicked() {
    this.loginClicked = true
  }

  closeModal(event: boolean) {
    this.loginClicked = event
  }

  validUser(valid: boolean) {
    this.loggedIn = valid
  }

  emitSearchedBooks(books: Array<any>) {
    console.log(books)
    this.emitBooks.emit(books)
  }
}
