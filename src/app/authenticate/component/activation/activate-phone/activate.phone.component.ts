import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {AuthenticateService} from '../../../services/authenticate.service';
import {MustMatch} from '../../../../shared/utils/must-match.validator';
import {Auth} from '../../../models/authenticate.model';

@Component({
  selector: 'app-reset-password-phone',
  templateUrl: 'activate.phone.component.html',
  styleUrls: ['activate.phone.component.scss']
})
export class ActivatePhoneComponent implements OnDestroy, OnInit{

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
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)

      ]),
    });
  }
  onSubmit(): void {

    if (this.fromGroup.invalid) {
      return;
    }
    this.submitted = true;

    const auth = new Auth({
      activeToken: this.fromGroup.value.code.replace(/\s/g, ''),
      phone: this.fromGroup.value.phone.replace(/\s/g, '')
    });
    this.authService.activateAccountViaSms(auth);
    this.fromGroup.reset();
  }

  onClearAlert(): void {
    this.authService.clearAlert();
  }

  ngOnDestroy(): void {
    this.authService.unsubscribe();
  }
  onSendSms(): void {

    if (this.fromGroup.controls.phone.invalid) {
      return;
    }
    const auth = new Auth({
      phone: this.fromGroup.value.phone,
    });

    this.authService.sendActivateCodeViaSms(auth);
  }
}
