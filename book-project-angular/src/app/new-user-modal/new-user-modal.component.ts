import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.scss']
})
export class NewUserModalComponent implements OnInit {

  @Input() newUserClicked: boolean;
  @Output() closeModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal() {
    this.closeModal.emit(false);
  }

  onClickSubmit(values) {
    console.log(values);
  }

}
