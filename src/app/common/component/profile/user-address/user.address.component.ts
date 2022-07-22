import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../../services/profile.service";
import { Subscription } from 'rxjs';
import {IProfile} from "../../../interfaces/profile.interface";
import {Profile} from "../../../models/profile.model";
import {HeaderService} from "../../../../admin-area/services/header.service";

@Component({
  selector: 'app-user-address',
  templateUrl: 'user.address.component.html',
  styleUrls: ['user.address.component.scss']
})
export class UserAddressComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  submitted: boolean;

  subscription: Subscription[];
  profileDetail!: IProfile;
  constructor(private navController: NavController,private route: Router,
              private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private  headerService: HeaderService) {
    this.subscription = [new Subscription()];
  }

  goBack() {
    this.navController.back();
  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

      country: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ])
    });

    this.profileService.query();
    this.subscription.push( this.profileService.getDataObservable().subscribe((profile) => {
      this.profileDetail = profile;
      this.formGroup.controls.country.setValue(profile.data?.country);
      this.formGroup.controls.city.setValue(profile.data?.city);
      this.formGroup.controls.address.setValue(profile.data?.address);
    }));
    this.subscription.push(this.headerService.getConfirmButton().subscribe(x=>{
      if(x=='user-address'){
        this.onSubmit();
      }
    }));

  }

  onSubmit(): void {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;

    const profile = new Profile({
      address: this.formGroup.value.address,
      country: this.formGroup.value.country,
      city: this.formGroup.value.city,
    });

    this.profileService.save(profile);

  }

  ngOnDestroy(): void {

    this.subscription.forEach(x=>x.unsubscribe());
    this.profileService.unsubscribe();
  }


}
