import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../data/book';

@Component({
  selector: 'search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss']
})
export class SearchResultListComponent implements OnInit {

  @Input() books: Array<Book> = []

  constructor() { }

  ngOnInit(): void {
  }

}
