import { Component, OnInit } from '@angular/core';
import { Book } from '../data/book';
import { Router, ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { addDoc, getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion  } from "firebase/firestore";

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.scss']
})
export class BookReviewComponent implements OnInit {

  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }  

  books: Array<Book> = [];
  similerbooks: Array<Book> = [];
  bookid;
  searchTerm;
  key = "AIzaSyAukQn7svQJN1ZruG8UK26I-LKr3lcEbGk";
  
  constructor(private activatedRoute: ActivatedRoute) { }

  reload(){
    setTimeout(() => {  window.location.reload(); }, 1);
  }
  
  firebaseConfig = {
    apiKey: "AIzaSyA970gnrfL9NNTRHm8Pj-HHiayCVQD0GZo",
    authDomain: "book-app-d90d1.firebaseapp.com",
    databaseURL: "https://book-app-d90d1-default-rtdb.firebaseio.com",
    projectId: "book-app-d90d1",
    storageBucket: "book-app-d90d1.appspot.com",
    messagingSenderId: "1019367376762",
    appId: "1:1019367376762:web:c759cb22843116796df8c3"
  };
  
  app = initializeApp(this.firebaseConfig);

  auth = getAuth();
  user = this.auth.currentUser;
  db = getFirestore(this.app);
  userId = this.user.uid;


  async writeUserData() {
    const addBook = doc(this.db, "users", this.userId);
    await updateDoc(addBook, {      
      Library: arrayUnion(this.bookid)
    });
  }

  ngOnInit() {    
    if (this.user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
      console.log(this.user);
    } else {
      // No user is signed in.
      console.log("it goofed")
    }
    this.bookid = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.bookid);
    fetch(`https://www.googleapis.com/books/v1/volumes/${this.bookid}?key=${this.key}`)
    .then(response => response.json())
    .then(result => {
          this.books[0] = result.volumeInfo
          this.searchTerm = result.volumeInfo.authors
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.searchTerm}&key=${this.key}`)
    .then(response => response.json())
    .then(result => {
      if (result.items.length > 0) {
        for (let i = 0; i < result.items.length; i++) {
          let data = result.items[i].volumeInfo;
          let id = result.items[i].id;
          this.similerbooks[i] = data;
          this.similerbooks[i].id = id;
          this.similerbooks = this.shuffle(this.similerbooks);
        }
      }
    })
  }) 
  }
}