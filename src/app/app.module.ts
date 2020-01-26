import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material.module';
import {RouteModule} from './route.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsComponent } from './components/student/students/students.component';
import { ModalComponent } from './components/comp/modal/modal.component';
import { ListsComponent } from './components/lists/lists.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TokenInterceptor } from './token-interceptor';
import { AccountComponent } from './components/account/account.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { TrueModalComponent } from './components/comp/true-modal/true-modal.component';
import { YesNoModalComponent } from './components/comp/yes-no-modal/yes-no-modal.component';
import { YesNoDeleteModalComponent } from './components/comp/yes-no-delete-modal/yes-no-delete-modal.component';
import { StudentComponent } from './components/student/student.component';
import { SnackBarComponent } from './components/comp/snack-bar/snack-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    ModalComponent,
    ListsComponent,
    LoginComponent,
    AccountsComponent,
    AccountComponent,
    TrueModalComponent,
    YesNoModalComponent,
    YesNoDeleteModalComponent,
    StudentComponent,
    SnackBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouteModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true
    },
    
  ],
  bootstrap: [AppComponent],
  entryComponents : [ModalComponent,TrueModalComponent,AccountComponent,YesNoModalComponent,YesNoDeleteModalComponent,SnackBarComponent] 
})
export class AppModule { }
