import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {AuthenticateService} from '../../../services/authenticate.service';
import {MustMatch} from '../../../../shared/utils/must-match.validator';
import {Auth} from '../../../models/authenticate.model';

@Component({
  selector: 'app-reset-password-email',
  templateUrl: 'reset.email.component.html',
  styleUrls: ['reset.email.component.scss']
})
export class ResetEmailComponent implements OnDestroy , OnInit{

  fromGroup!: FormGroup;
  submitted: boolean;
  constructor(private navController: NavController,
              private formBuilder: FormBuilder,
              private authService: AuthenticateService) {
    this.submitted = false;
  }


  goBack() {
    this.navController.back();
  }

  ngOnInit(): void {
    this.fromGroup = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      token: new FormControl('', [
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
      email: this.fromGroup.value.email,
      resetToken: this.fromGroup.value.token,
      password: this.fromGroup.value.password,
      passConfirm: this.fromGroup.value.passConfirm
    });
    this.authService.resetPasswordViaEmail(auth);
    this.fromGroup.reset();
  }

  onClearAlert(): void {
    this.authService.clearAlert();
  }

  ngOnDestroy(): void {
    this.authService.unsubscribe();
  }
}
