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

  constructor() { }


  ngOnInit(): void {
  }


  onCloseModal() {
    this.closeModal.emit(false)
  }

  logIn(user: { username: String, password: string }) {
    if (user.username == "will" && user.password == "12345") {
      this.loggedIn.emit(true);
    }
  }
}
