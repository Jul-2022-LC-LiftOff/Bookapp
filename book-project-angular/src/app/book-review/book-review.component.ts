import { Component, OnInit } from '@angular/core';
import { Book } from '../data/book';
import { Router, ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { getAuth, onAuthStateChanged  } from "firebase/auth";
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
      [array[currentIndex], array[randomIndex]] = 
      [array[randomIndex], array[currentIndex]];
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
  userId;
  Reviews;
  htmlToAdd;
  username;
  uid;

  async writeUserData() {
    const addBook = doc(this.db, "users", this.userId);
    await updateDoc(addBook, {      
      Library: arrayUnion(this.bookid)
    });
  }

  async addReview(text) {
    let reviewText = text.review;
    let reviewObj = {
      bookid: this.bookid,
      review: reviewText
    };
    let reviewWithQuotes = '"' + text.review + '"' + ` by: ` + this.username;
    this.user = this.auth.currentUser;
    const addReview = doc(this.db, "users", this.user.uid);
    const reviewReal = doc(this.db, "reviews", this.bookid);
    const docSnap = await getDoc(reviewReal);
    if (docSnap.exists()) {
    } else {
      const docRef = await setDoc(doc(this.db, "reviews", this.bookid), {
      });
    }
    await updateDoc(addReview, {      
      My_Reviews: arrayUnion(reviewObj)
    });
    const addReviewBook = doc(this.db, "reviews", this.bookid);
    await updateDoc(addReviewBook, {      
      Reviews: arrayUnion(reviewWithQuotes)
    });
    window.location.reload();
  }

  async ngOnInit(): Promise<void>{
    this.bookid = this.activatedRoute.snapshot.paramMap.get('id');
    fetch(`https://www.googleapis.com/books/v1/volumes/${this.bookid}?key=${this.key}`)
    .then(response => response.json())
    .then(result => {
          this.books[0] = result.volumeInfo
          this.searchTerm = result.volumeInfo.authors
          this.htmlToAdd = this.books[0].description;
          // if (this.books[0].imageLinks.medium)
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.searchTerm}&key=${this.key}`)
    .then(response => response.json())
    .then(result => {
      if (result.items.length > 0) {
        for (let i = 0; i < result.items.length; i++) {
          let data = result.items[i].volumeInfo;
          let id = result.items[i].id;
          this.similerbooks[i] = data;
          this.similerbooks[i].id = id;
          if (this.similerbooks[i].imageLinks == undefined) {
            this.similerbooks[i].imageLinks = {
              smallThumbnail: "https://toppng.com/uploads/preview/this-free-icons-design-of-books-opened-11550253335r5kvxff5ql.png",
              thumbnail: "https://toppng.com/uploads/preview/this-free-icons-design-of-books-opened-11550253335r5kvxff5ql.png",
              small: "https://toppng.com/uploads/preview/this-free-icons-design-of-books-opened-11550253335r5kvxff5ql.png",
              medium: "https://toppng.com/uploads/preview/this-free-icons-design-of-books-opened-11550253335r5kvxff5ql.png",
              large: "https://toppng.com/uploads/preview/this-free-icons-design-of-books-opened-11550253335r5kvxff5ql.png",
              extraLarge: "https://toppng.com/uploads/preview/this-free-icons-design-of-books-opened-11550253335r5kvxff5ql.png"
            };
          }
        }
        this.similerbooks = this.shuffle(this.similerbooks);
      }
    })
  })
  const docRef = doc(this.db, "reviews", this.bookid);
  const docSnap = await getDoc(docRef);
  this.Reviews = docSnap.data()['Reviews'];
  const auth = getAuth();
  this.user = this.auth.currentUser;
  onAuthStateChanged(auth, async (user) => {
    if (user) {
    //if the user is signed in
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    this.userId= user.uid;
    this.username = user.displayName;
    } else {
    // User is signed out
    console.log("user is signed out")
    }
    });
    }
}