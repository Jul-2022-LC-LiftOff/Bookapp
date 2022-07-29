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

  onClickSubmit(data: { username: string, password: string }) {
    // console.log(data.username, data.password)
    if (data.username == this.username && data.password == this.password) {
      this.invalidPassword = false
      this.invalidUsername = false
      this.loggedIn.emit(true);
      this.onCloseModal()
    } else if (data.password != this.password && data.username == this.username) {
      this.invalidPassword = true
      this.invalidUsername = false
      this.loggedIn.emit(false)
    } else if (data.username != this.username && data.password == this.password) {
      this.invalidUsername = true
      this.invalidPassword = false
      this.loggedIn.emit(false)
    } else {
      this.invalidPassword = true
      this.invalidUsername = true
      this.loggedIn.emit(false)
    }
  }
}
