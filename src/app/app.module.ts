import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material.module';
import {RouteModule} from './route.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsComponent } from './components/student/students/students.component';
import { ModalComponent } from './components/comp/modal/modal.component';
import { ListsComponent } from './components/lists/lists.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TokenInterceptor } from './token-interceptor';
import { AccountsComponent } from './components/account/accounts/accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    ModalComponent,
    ListsComponent,
    LoginComponent,
    AccountsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouteModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true
  }],
  bootstrap: [AppComponent],
  entryComponents : [ModalComponent]
})
export class AppModule { }
