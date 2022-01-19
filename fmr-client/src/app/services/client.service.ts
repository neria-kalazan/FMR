import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Client} from "../pages/client/client.interface";
import {Pagination} from "../app.interfaces";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  getClients(data: Pagination) {
    const reqParams = new HttpParams()
      .set('limit', data.limit.toString())
      .set('page', data.page.toString())
      .set('keyword', data.keyword);
    return this.http.get<any>('client', {params: reqParams});
  };

  getClient(clientId: number) {
    return this.http.get<any>(`client/${clientId}`);
  };

  createClient(client: Client) {
    return this.http.post<any>(`client`, {...client});
  };

  updateClient(client: Client) {
    console.log('client', client);
    return this.http.put<any>(`client/${client.id}`, {...client});
  };

  deleteClient(clientId: number) {
    return this.http.delete<any>(`client/${clientId}`);
  };

}
