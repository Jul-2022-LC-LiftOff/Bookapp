import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { Book } from '../data/book';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  firebaseConfig = {
    apiKey: "AIzaSyA970gnrfL9NNTRHm8Pj-HHiayCVQD0GZo",
    authDomain: "book-app-d90d1.firebaseapp.com",
    databaseURL: "https://book-app-d90d1-default-rtdb.firebaseio.com",
    projectId: "book-app-d90d1",
    storageBucket: "book-app-d90d1.appspot.com",
    messagingSenderId: "1019367376762",
    appId: "1:1019367376762:web:c759cb22843116796df8c3"
  };

  books: Array<Book> = [];
  key = "AIzaSyAukQn7svQJN1ZruG8UK26I-LKr3lcEbGk";
  app = initializeApp(this.firebaseConfig);
  auth = getAuth();
  db = getFirestore(this.app);
  user = this.auth.currentUser;
  userId = this.user.uid;
  library;

  constructor() { }

  async ngOnInit(): Promise<void> {
    const docRef = doc(this.db, "users", this.userId);
    const docSnap = await getDoc(docRef);
    this.library = docSnap.data()['Library'];
    for (let i = 0; i < this.library.length; i++) {
      fetch(`https://www.googleapis.com/books/v1/volumes/${this.library[i]}?key=${this.key}`)
      .then(response => response.json())
      .then(result => {
            this.books[i] = result.volumeInfo;
            this.books[i].id = result.id;
      })  
    }
    // console.log(this.books[1].id);
  }
}
