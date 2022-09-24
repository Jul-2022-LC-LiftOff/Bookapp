import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { currentUser } from '../data/userData';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  firebaseConfig = {
    apiKey: "AIzaSyA970gnrfL9NNTRHm8Pj-HHiayCVQD0GZo",
    authDomain: "book-app-d90d1.firebaseapp.com",
    databaseURL: "https://book-app-d90d1-default-rtdb.firebaseio.com",
    projectId: "book-app-d90d1",
    storageBucket: "book-app-d90d1.appspot.com",
    messagingSenderId: "1019367376762",
    appId: "1:1019367376762:web:c759cb22843116796df8c3"
  };


  key = "AIzaSyAukQn7svQJN1ZruG8UK26I-LKr3lcEbGk";
  app = initializeApp(this.firebaseConfig);
  auth = getAuth();
  db = getFirestore(this.app);
  user = this.auth.currentUser;
  //userId = user.uid;

  username: string
  userImage: string
  constructor() {
    this.username = currentUser.name
    this.userImage = currentUser.image
  }
  
  ngOnInit(): void {
    // console.log(this.auth)
    // console.log(this.auth.currentUser)
  }


}
