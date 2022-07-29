import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  // @Output() loginClicked = new EventEmitter<boolean>;
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

}
