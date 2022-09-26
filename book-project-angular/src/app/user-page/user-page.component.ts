import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { currentUser } from '../data/userData';
import { Book } from '../data/book';

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
  userId//= this.user.uid;
  

  username: string
  userImage: string
  userEmail: string
  userVerified: boolean
  userCreationDate: string
  userLastSignIn: string
  userPhone: string
  reviews: string
  library
  reviewTitles : Array<string> = [];
  
  books: Array<Book> = [];

  constructor() {
    this.username = currentUser.name
    this.userImage = currentUser.image
    //this.userId = this.user.uid
  }



  async ngOnInit(): Promise<void> {
  
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    //if the user is signed in
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    this.userId= user.uid;
    this.username = user.displayName;
    this.userImage = this.auth.currentUser.photoURL;
    this.userEmail = this.auth.currentUser.email
    this.userVerified = this.auth.currentUser.emailVerified
    this.userCreationDate = user.metadata.creationTime
    this.userLastSignIn = user.metadata.lastSignInTime
    this.userPhone = user.phoneNumber
    
    const docRef = doc(this.db,"users",uid)
   const docSnap = await getDoc(docRef);
   this.reviews = docSnap.data()['My_Reviews'];
  //  console.log(this.reviews[0]['review'])
  //  console.log(this.reviews[0]['bookid'])

   for(let i of this.reviews){
    //console.log(i)
    let idk = i['bookid']
    //console.log(idk)
    this.reviewTitles.push(idk)
   }
   console.log(this.reviewTitles)
   for (let i = 0; i < this.reviewTitles.length; i++) {
     fetch(`https://www.googleapis.com/books/v1/volumes/${this.reviewTitles[i]}?key=${this.key}`)
     .then(response => response.json())
     .then(result => {
           this.books[i] = result.volumeInfo;
           this.books[i].id = result.id;
     })  
   }
   //console.log(this.books[0].title)
    
  } else {
    // User is signed out
    console.log("user is signed out")
  }
   });
   
   
  }
}



