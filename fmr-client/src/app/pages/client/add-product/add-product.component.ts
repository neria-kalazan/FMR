import { Component, OnInit } from '@angular/core';
import {Product} from "../client.interface";
import {ProductService} from "../../../services/product.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../../services/client.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public selectedProduct?: Product;
  public productList: Product[] = [];
  public clientId?: number;
  isVisible = false;
  busy = false;


  public productClientForm = new FormGroup({
    customer_id: new FormControl(null, Validators.required),
    product_id: new FormControl(null, Validators.required),
    deposit: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private productService: ProductService
  ) {
    this.loadProducts();
  }

  ngOnInit(): void {
    if (this.clientId = this.route.snapshot.params['id']) {
      this.clientService.getClient(this.clientId)
        .subscribe(client => {
          if (!client) {
            this.router.navigateByUrl('/client');
          } else {
            this.productClientForm.get('customer_id')?.setValue(this.clientId);
          }
        });
    }

    this.productClientForm.get('product_id')?.valueChanges.subscribe(val => {
      this.selectedProduct = this.productList.filter(p => p.id = val)[0];
    });

  }

  loadProducts () {
    this.busy = true;
    this.productService.getProducts()
      .subscribe(data => {
        this.productList = data;
        this.busy = false;
      })
  }

  submitForm(): void {
    const data = this.productClientForm.value;
    this.productService.saveProductClient(data)
      .subscribe(() => {
        this.router.navigate(['client', this.clientId]);
      })
  }

  calculate(n: number): number {
    // =P*(1+(k/m))^(m*n)

    const p = this.productClientForm.get('deposit')?.value; // first sum
    const k = this.selectedProduct?.deposit || 0; // interest

    return p*(1+k)^n;
  }

  openModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


}
