import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {PermissionService} from "../../../services/permission.service";
import {Permission} from "../../../models/permission.model";
import {Subscription} from "rxjs";
import {HeaderService} from "../../../../admin-area/services/header.service";


@Component({
  selector: 'app-permission-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit , OnDestroy{
  subscription: Subscription;
  formGroup!: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private permissionService: PermissionService,
              private  headerService:HeaderService) {
    this.submitted = false;
    this.subscription = new Subscription();

  }

  ngOnInit(): void {


    this.formGroup = this.formBuilder.group({

      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      active: new FormControl('', [
        Validators.required,
      ]),
    });
    this.subscription=this.headerService.getConfirmButton().subscribe(x=>{
      if(x=='permission'){
        this.onSubmit();
      }
    });

  }

  onSubmit(): void  {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;
    const permission = new Permission({
      name: this.formGroup.value.name.toLowerCase(),
      description: this.formGroup.value.description,
      active: this.formGroup.value.active,

    });

    this.permissionService.clearAlert();
    this.permissionService.save(permission);

  }

  ngOnDestroy(): void  {
this.subscription.unsubscribe();
    this.permissionService.unsubscribe();
  }

}
