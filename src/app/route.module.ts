import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ListsComponent } from './components/lists/lists.component';

const routes : Routes = [
    {path : "lists", component : ListsComponent}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class RouteModule{}