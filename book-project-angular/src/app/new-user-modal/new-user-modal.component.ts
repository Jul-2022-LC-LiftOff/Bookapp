import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.scss']
})
export class NewUserModalComponent implements OnInit {

  @Input()
  newUserClicked: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal() {

  }


  onClickSubmit(values) {
    console.log(values)
  }

}
