import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  @Input() loginClicked: boolean;
  @Output() closeModal = new EventEmitter<boolean>()
  @Output() loggedIn = new EventEmitter<boolean>()
  @Output() newUserClicked = new EventEmitter<boolean>()
  loginFailed: boolean;

  // temporary credentials:
  password: string = "12345"
  username: string = "will"

  //display controls for validation:
  invalidPassword: boolean;
  invalidUsername: boolean;

  constructor() { }


  ngOnInit(): void {
  }


  onCloseModal() {
    this.closeModal.emit(false)
  }

  newUserClick() {
    this.closeModal.emit(false)
    this.newUserClicked.emit(true)
  }

  onClickSubmit(userData) {
    // Send HTTP REQUEST to SPRING to verify user is in the user table. 
  }
}
