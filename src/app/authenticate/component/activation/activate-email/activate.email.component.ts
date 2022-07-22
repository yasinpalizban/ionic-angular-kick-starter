import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {AuthenticateService} from '../../../services/authenticate.service';
import {MustMatch} from '../../../../shared/utils/must-match.validator';
import {Auth} from '../../../models/authenticate.model';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-reset-password-email',
  templateUrl: 'activate.email.component.html',
  styleUrls: ['activate.email.component.scss']
})
export class ActivateEmailComponent implements OnDestroy , OnInit{

  fromGroup!: FormGroup;
  submitted: boolean;
  constructor(private navController: NavController,
              private formBuilder: FormBuilder,
              private authService: AuthenticateService,
              private activatedRoute: ActivatedRoute) {
    this.submitted = false;
  }


  goBack() {
    this.navController.back();
  }

  ngOnInit(): void {
    this.fromGroup = this.formBuilder.group({
      token: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)

      ]),
    });


    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params) {

        this.authService.activateAccountViaEmail(params.token);
      }
    });
  }

  onSubmit(): void {

    if (this.fromGroup.invalid) {
      return;
    }
    this.submitted = true;

    const auth = new Auth({
      activeToken: this.fromGroup.value.token.replace(/\s/g, ''),
      email: this.fromGroup.value.email.replace(/\s/g, '')
    });
    this.authService.activateAccountViaEmail(auth);
    this.fromGroup.reset();
  }

  onClearAlert(): void {
    this.authService.clearAlert();
  }

  ngOnDestroy(): void {
    this.authService.unsubscribe();
  }
  onSendEmail(): void {

    if (this.fromGroup.controls.email.invalid) {
      return;
    }
    const auth = new Auth({
      email: this.fromGroup.value.email
    });

    this.authService.sendActivateCodeViaEmail(auth);
  }
}
