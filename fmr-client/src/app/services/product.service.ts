import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client, Product, ProductClientLink} from "../pages/client/client.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>('product');
  };

  saveProductClient(productClient: ProductClientLink) {
    return this.http.post<any>(`product/link`, {...productClient});
  };
}
