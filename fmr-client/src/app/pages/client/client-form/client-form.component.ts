import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../../services/client.service";
import {Address, Client, Phone} from "../client.interface";
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressType, PhoneType} from "../client.const";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  public formType = 'add';
  public client?: Client;
  public clientId?: number;
  public phoneType = PhoneType;
  public addressType = AddressType;

  public clientForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    id_number: new FormControl('', Validators.required),
    phone: new FormArray([]),
    address: new FormArray([]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    if (this.clientId = this.route.snapshot.params['id']) {
      this.formType = 'edit';
      this.clientService.getClient(this.clientId)
        .subscribe(client => {
          if (!client) {
            this.router.navigate(['client', 'add']);
          } else {
            this.clientForm.patchValue(client);

            if (client.phone.length) {
              let formArray: FormArray = this.clientForm.get('phone') as FormArray;
              client.phone.forEach((p: Phone) => {
                formArray.push(this.createPhoneGroup(p));
              });
            }
            if (client.address.length) {
              let formArray: FormArray = this.clientForm.get('address') as FormArray;
              client.address.forEach((a: Address) => {
                formArray.push(this.createAddressGroup(a));
              });
            }
          }
        });
    }

  }

  onSubmit() {
    const data = this.clientForm.value;
    const method = this.formType == 'add' ? 'createClient' : 'updateClient';
    this.clientService[method](data)
      .subscribe(() => {
        this.router.navigate(['client']);
      })
  }

  getControlsAsArray(controls: AbstractControl | null) {
    if (!controls) return [];
    return (controls as FormArray).controls;
  }

  // Phone methods
  public addPhone() {
    const phones = this.clientForm.get('phone') as FormArray
    phones.push(this.createPhoneGroup())
  }

  public removePhone(i: number) {
    const phones = this.clientForm.get('phone') as FormArray
    if (phones.length > 1) {
      phones.removeAt(i)
    } else {
      phones.reset()
    }
  }

  createPhoneGroup(phone?: Phone): FormGroup {
    return new FormGroup({
      id: new FormControl(phone?.id),
      type: new FormControl(phone?.type, Validators.required),
      phone_number: new FormControl(phone?.phone_number, Validators.required)
    })
  }

  // Address methods
  public addAddress() {
    const addresses = this.clientForm.get('address') as FormArray
    addresses.push(this.createAddressGroup())
  }

  public removeAddress(i: number) {
    const addresses = this.clientForm.get('address') as FormArray
    if (addresses.length > 1) {
      addresses.removeAt(i)
    } else {
      addresses.reset()
    }
  }

  createAddressGroup(address?: Address): FormGroup {
    return new FormGroup({
      id: new FormControl(address?.id),
      type: new FormControl(address?.type, Validators.required),
      city: new FormControl(address?.city, Validators.required),
      street: new FormControl(address?.street),
      house_number: new FormControl(address?.house_number),
      pob: new FormControl(address?.pob),
      zip_number: new FormControl(address?.zip_number),
    })
  }

}
