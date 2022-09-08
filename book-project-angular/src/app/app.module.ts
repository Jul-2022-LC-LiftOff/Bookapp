import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { UserPageComponent } from './user-page/user-page.component';
import { BookDisplayPageComponent } from './book-display-page/book-display-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultListComponent } from './search-result-list/search-result-list.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import { BookReviewComponent } from './book-review/book-review.component';
import { Routes, RouterModule } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'book/:id', component: BookReviewComponent},
  { path: 'list', component: ListComponent},
  { path: 'home', component: BookDisplayPageComponent },
  { path: 'user', component: UserPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

const firebaseConfig = {
  apiKey: "AIzaSyA970gnrfL9NNTRHm8Pj-HHiayCVQD0GZo",
  authDomain: "book-app-d90d1.firebaseapp.com",
  databaseURL: "https://book-app-d90d1-default-rtdb.firebaseio.com",
  projectId: "book-app-d90d1",
  storageBucket: "book-app-d90d1.appspot.com",
  messagingSenderId: "1019367376762",
  appId: "1:1019367376762:web:c759cb22843116796df8c3"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    LoginModalComponent,
    UserPageComponent,
    BookDisplayPageComponent,
    SearchBarComponent,
    SearchResultListComponent,
    SearchResultPageComponent,
    BookReviewComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
