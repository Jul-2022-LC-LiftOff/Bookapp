import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { UserPageComponent } from './user-page/user-page.component';
import { BookDisplayPageComponent } from './book-display-page/book-display-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    LoginModalComponent,
    UserPageComponent,
    BookDisplayPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
