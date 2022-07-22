import {NgModule} from '@angular/core';
import {AuthenticateRoutingModule} from './authenticate-routing.module';
import {SignInComponent} from './sign-in/sign.in.component';
import {SignUpComponent} from './sign-up/sign.up.component';
import {SignOutComponent} from './sign-out/sign.out.component';
import {ForgotComponent} from './forgot/forgot.component';
import {SharedModule} from '../../shared/shared.module';
import {ResetEmailComponent} from './reset-password/reset-email/reset.email.component';
import {ResetPhoneComponent} from './reset-password/reset-phone/reset.phone.component';
import {ResetPasswordComponent} from './reset-password/reset.password.component';
import {ActivationComponent} from './activation/activation.component';
import {ActivatePhoneComponent} from './activation/activate-phone/activate.phone.component';
import {ActivateEmailComponent} from './activation/activate-email/activate.email.component';
@NgModule({
  imports: [
    SharedModule,
    AuthenticateRoutingModule,
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    ForgotComponent,

    ResetEmailComponent,
    ResetPhoneComponent,
    ResetPasswordComponent,
    ActivationComponent,
    ActivatePhoneComponent,
    ActivateEmailComponent

  ]
})
export class AuthenticateModule {
}
