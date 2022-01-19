import { Component, OnInit } from '@angular/core';
import {Client} from "../client.interface";
import {ClientService} from "../../../services/client.service";
import {Pagination} from "../../../app.interfaces";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  public clients: Client[] = [];
  public countClients = 0;
  public busy = false;
  public paginate: Pagination = {
    page: 1,
    limit: 10,
    keyword: '',
  };

  constructor(
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData () {
    this.busy = true;
    this.clientService.getClients(this.paginate)
      .subscribe(data => {
        this.clients = data.rows;
        this.countClients = data.count;
        this.busy = false;
      })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.paginate.page = pageIndex;
    this.paginate.limit = pageSize;
    this.loadData();
  }

  deleteClient(clientId: number) {
    this.clientService.deleteClient(clientId)
        .subscribe(() => {
          this.loadData();
        })
  }

}
