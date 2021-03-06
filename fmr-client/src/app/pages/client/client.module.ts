import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientListComponent} from "./client-list/client-list.component";
import {ClientViewComponent} from "./client-view/client-view.component";
import {ClientFormComponent} from "./client-form/client-form.component";
import {ClientRoutingModule} from "./client-routing.module";
import {ClientService} from "../../services/client.service";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {AddProductComponent} from "./add-product/add-product.component";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";

@NgModule({
  declarations: [
    ClientListComponent,
    ClientViewComponent,
    ClientFormComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzTypographyModule,
    NzButtonModule,
    NzIconModule,
    NzSpaceModule,
    NzFormModule,
    NzInputModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzInputNumberModule,
    NzModalModule,
    NzDatePickerModule,
  ],
  providers: [
    ClientService
  ]
})

export class ClientModule { }
