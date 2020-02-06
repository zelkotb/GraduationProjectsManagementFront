import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ListsComponent } from './components/lists/lists.component';
import { LoginComponent } from './components/auth/login/login.component';
import { StudentComponent } from './components/student/student.component';
import { AuthGuard } from './auth.guard';
import { GraduationProjectComponent } from './components/graduation-project/graduation-project.component';

const routes : Routes = [
    {path : "lists", component : ListsComponent, canActivate : [AuthGuard]},
    {path : "login", component : LoginComponent},
    //{path : 'account/:id', component : AccountComponent}
    {path : 'student', component : StudentComponent, canActivate : [AuthGuard]},
    {path : 'gp', component : GraduationProjectComponent, canActivate : [AuthGuard]}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule],
    providers : [AuthGuard]
})
export class RouteModule{}