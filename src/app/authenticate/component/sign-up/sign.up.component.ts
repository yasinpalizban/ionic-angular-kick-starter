import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticateService} from '../../services/authenticate.service';
import {Subscription} from 'rxjs';
import {Auth} from '../../models/authenticate.model';

import {MustMatch} from '../../../shared/utils/must-match.validator';

@Component({
  selector: 'app-up',
  templateUrl: 'sign.up.component.html',
  styleUrls: ['sign.up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  fromGroup!: FormGroup;
  submitted: boolean;
  subscription: Subscription[];
  token: string;
  action: string;
  constructor(private navController: NavController,
              private formBuilder: FormBuilder,
              private authService: AuthenticateService,

  ) {
    this.submitted = false;
    this.subscription = [new Subscription()];


  }


  goBack() {
    this.navController.back();
  }


  ngOnInit(): void {
    this.fromGroup = this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
      ]),
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      passConfirm: new FormControl('', [
        Validators.required,

      ]),
    }, {
      validators: MustMatch('password', 'passConfirm')
    });
  }

  onSubmit(): void {

    if (this.fromGroup.invalid) {
      return;
    }
    this.submitted = true;
    const auth = new Auth({
      username: this.fromGroup.value.username,
      login: this.fromGroup.value.login,
      password: this.fromGroup.value.password,
      passConfirm: this.fromGroup.value.passConfirm,
      socialLogin: 'false',
      action: this.action,
      token: this.token
    });
    this.authService.signUp(auth);
    this.fromGroup.reset();
  }

  signInWithGoogle(): void {

  }

  signInWithInstagram(): void {

  }

  signInWithFB(): void {

  }


  refreshToken(): void {
  }

  ngOnDestroy(): void {
    this.authService.unsubscribe();
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
