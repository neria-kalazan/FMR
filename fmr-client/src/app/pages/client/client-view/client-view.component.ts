import { Component, OnInit } from '@angular/core';
import {Address, Client, Phone} from "../client.interface";
import {ClientService} from "../../../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

  public client?: Client;
  public clientId?: number;
  public busy = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    if (this.clientId = this.route.snapshot.params['id']) {
      this.clientService.getClient(this.clientId)
        .subscribe(client => {

          console.log('client', client)

          this.busy = false;
          if (!client) this.router.navigate(['client']);
          this.client = client;
        });
    }
  }

}
