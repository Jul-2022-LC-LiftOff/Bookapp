import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect , GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore';

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
  password: string = "testpassword"
  username: string = "testname"

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

  ngOnInit(): void {}

  onCloseModal() {
    this.closeModal.emit(false)
  }

  onClickSubmit() {
    // console.log(data.username, data.password)
    // if (data.username == this.username && data.password == this.password) {
    //   this.invalidPassword = false
    //   this.invalidUsername = false
    //   this.loggedIn.emit(true);
    //   this.onCloseModal()
    // } else if (data.password != this.password && data.username == this.username) {
    //   this.invalidPassword = true
    //   this.invalidUsername = false
    //   this.loggedIn.emit(false)
    // } else if (data.username != this.username && data.password == this.password) {
    //   this.invalidUsername = true
    //   this.invalidPassword = false
    //   this.loggedIn.emit(false)
    // } else {
    //   this.invalidPassword = true
    //   this.invalidUsername = true
    //   this.loggedIn.emit(false)
    // }
    // this.userId++;
    // this.writeUserData(this.username, this.password)
    signInWithPopup(this.auth, this.provider)
  .then(async (result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  this.user = result.user;
  this.userId = this.user.uid;
  this.docUserId = this.userId;
  const logedIn = doc(this.db, "users", this.docUserId);
  const docSnap = await getDoc(logedIn);
  if (docSnap.exists()) {
    console.log("logged in");
  }  else {
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
    }).catch((error) => {
      // An error happened.
    });
  }
}
