import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../../services/profile.service";
import {MustMatch} from "../../../../shared/utils/must-match.validator";
import {Profile} from "../../../models/profile.model";
import {Subscription} from "rxjs";
import {HeaderService} from "../../../../admin-area/services/header.service";

@Component({
  selector: 'app-user-password',
  templateUrl: 'user.password.component.html',
  styleUrls: ['user.password.component.scss']
})
export class UserPasswordComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  submitted: boolean;
  subscription: Subscription[];
  constructor(private navController: NavController,
              private route: Router,
              private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private  headerService: HeaderService) {
    this.submitted= false;
    this.subscription = [new Subscription()];
  }

ngOnInit() {

  this.formGroup = this.formBuilder.group({
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ]),
    passConfirm: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)


    ]),
  }, {
    validators: MustMatch('password', 'passConfirm')
  });
  this.subscription.push(this.headerService.getConfirmButton().subscribe(x=>{
    if(x=='user-password'){
      this.onSubmit();
    }
  }));
}

  goBack() {
    this.navController.back();
  }
  onSubmit(): void {


    if (this.formGroup.invalid) {
      return;
    }
    this.submitted = true;
    const profile = new Profile({
      password: this.formGroup.value.password,
      passConfirm: this.formGroup.value.passConfirm
    });
    this.profileService.save(profile);
  }

  ngOnDestroy(): void {


    this.profileService.unsubscribe();
  }

}
