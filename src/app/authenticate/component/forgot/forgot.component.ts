import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthenticateService} from '../../services/authenticate.service';
import {Auth} from '../../models/authenticate.model';

@Component({
  selector: 'app-forgot',
  templateUrl: 'forgot.component.html',
  styleUrls: ['forgot.component.scss']
})
export class ForgotComponent implements OnInit, OnDestroy{
  fromGroup!: FormGroup;
  submitted: boolean;
  subscription: Subscription;

  constructor(private navController: NavController,
              private formBuilder: FormBuilder,
              private authService: AuthenticateService) {
    this.submitted = false;
    this.subscription = new Subscription();
  }


  ngOnInit(): void {
    this.fromGroup = this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
      ])
    });
  }


  onSubmit(): void {

    if (this.fromGroup.invalid) {
      return;
    }
    this.submitted = true;
    const auth = new Auth({
      login: this.fromGroup.value.login,
    });
    this.authService.forgot(auth);
    this.fromGroup.reset();
  }


  ngOnDestroy(): void {
    this.authService.unsubscribe();
    if (this.subscription)
      {this.subscription.unsubscribe();}
  }

  goBack() {
    this.navController.back();
  }
}
