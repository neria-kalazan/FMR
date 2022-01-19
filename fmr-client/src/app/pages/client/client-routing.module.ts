import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientListComponent} from "./client-list/client-list.component";
import {ClientFormComponent} from "./client-form/client-form.component";
import {ClientViewComponent} from "./client-view/client-view.component";

const routes: Routes = [
  { path: '', component: ClientListComponent },
  { path: 'add', component: ClientFormComponent },
  { path: ':id', component: ClientViewComponent },
  { path: ':id/edit', component: ClientFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
