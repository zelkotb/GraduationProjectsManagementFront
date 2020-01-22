import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ListsComponent } from './components/lists/lists.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AccountComponent } from './components/account/account.component';

const routes : Routes = [
    {path : "lists", component : ListsComponent},
    {path : "login", component : LoginComponent},
    //{path : 'account/:id', component : AccountComponent}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class RouteModule{}