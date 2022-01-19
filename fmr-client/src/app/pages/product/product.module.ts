import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductViewComponent} from "./product-view/product-view.component";
import {ProductFormComponent} from "./product-form/product-form.component";
import {ProductRoutingModule} from "./product-routing.module";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductViewComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
