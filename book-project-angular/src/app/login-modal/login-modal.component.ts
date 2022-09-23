import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { currentUser } from '../data/userData';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnChanges {

  @Input() logoutClicked: boolean = false;
  @Input() loginClicked: boolean;
  @Output() closeModal = new EventEmitter<boolean>()
  @Output() loggedIn = new EventEmitter<boolean>()
  loginFailed: boolean;
  signedIn: boolean;

  // temporary credentials:
  // password: string = "testpassword"
  // username: string = "testname"

  //display controls for validation:
  invalidPassword: boolean;
  invalidUsername: boolean;

  userId = 1;
  user;
  docUserId;

  provider = new GoogleAuthProvider();
  auth = getAuth();

  constructor() { }

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

  existingUser = this.auth.currentUser;
  db = getFirestore(this.app);

  // async writeUserData(name) {
  //   console.log("test");
  //   const docRef = await addDoc(collection(this.db, "users"), {      
  //     username: name
  //   });
  // }

  ngOnInit(): void { }

  onCloseModal() {
    this.closeModal.emit(false)
  }

  onClickSubmit() {
    signInWithPopup(this.auth, this.provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        this.user = result.user;
        currentUser['name'] = this.user.displayName
        currentUser['image'] = this.user.imageURL
        this.userId = this.user.uid;
        this.docUserId = this.userId;
        const logedIn = doc(this.db, "users", this.docUserId);
        const docSnap = await getDoc(logedIn);
        if (docSnap.exists()) {
          console.log("logged in");
          this.signedIn = true
          this.loggedIn.emit(true)
        } else {
          const docRef = await setDoc(doc(this.db, "users", this.docUserId), {
            username: this.user.displayName
          });
        }
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

  onClickSignout() {
    signOut(this.auth).then(() => {
      // Sign-out successful.
      console.log("signed out");
      this.signedIn = false
      this.loggedIn.emit(false)
      this.onCloseModal()
    }).catch((error) => {
      // An error happened.
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.logoutClicked == true) {
      this.onClickSignout()
      this.logoutClicked = false
    }
  }
}
