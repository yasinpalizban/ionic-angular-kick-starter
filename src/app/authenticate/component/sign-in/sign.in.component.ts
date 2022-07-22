import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateService} from '../../services/authenticate.service';
import {Auth} from '../../models/authenticate.model';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign.in.component.html',
  styleUrls: ['sign.in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  remember: boolean;
  fromGroup!: FormGroup;
  submitted: boolean;
  subscription: Subscription;

  constructor(private router: Router, private authenticateService: AuthenticateService,
              private formBuilder: FormBuilder) {
    this.remember = false;
    this.submitted = false;
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.authenticateService.isSignIn();
    this.fromGroup = this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }


  onSubmit(): void {


    if (this.fromGroup.invalid) {
      return;
    }

    this.submitted= true;
    const auth = new Auth({login:this.fromGroup.value.login, password: this.fromGroup.value.password, remember: this.remember});
    this.authenticateService.signInJwt(auth);

    // ngForm.reset();
  }

  loout(): void {
    this.authenticateService.signOut();
  }

  ngOnDestroy(): void {
    this.authenticateService.unsubscribe();
  }
}
