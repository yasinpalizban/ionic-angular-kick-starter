import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebSiteComponent} from '../../web-site/web.site.component';
import {SignInComponent} from './sign-in/sign.in.component';
import {ForgotComponent} from './forgot/forgot.component';
import {SignOutComponent} from './sign-out/sign.out.component';
import {SignUpComponent} from './sign-up/sign.up.component';;
import {ResetPasswordComponent} from './reset-password/reset.password.component';
import {ResetEmailComponent} from './reset-password/reset-email/reset.email.component';
import {ResetPhoneComponent} from './reset-password/reset-phone/reset.phone.component';
import {ActivationComponent} from './activation/activation.component';
import {ActivateEmailComponent} from './activation/activate-email/activate.email.component';
import {ActivatePhoneComponent} from './activation/activate-phone/activate.phone.component';

const routes: Routes = [
  {
    path: '',
    component: WebSiteComponent, children: [
      {path: 'sign-in', component: SignInComponent},
      {path: 'sign-out', component: SignOutComponent},
      {path: 'forgot', component: ForgotComponent},
      {path: 'sign-up', component: SignUpComponent},
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        children: [
          {
            path: 'tab1',
            component: ResetEmailComponent
          },
          {
            path: 'tab2', component: ResetPhoneComponent
          },
          {
            path: '',
            redirectTo: '/reset-password/tab1',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'activation',
        component: ActivationComponent,
        children: [
          {
            path: 'tab1',
            component: ActivateEmailComponent
          },
          {
            path: 'tab2', component: ActivatePhoneComponent
          },
          {
            path: '',
            redirectTo: '/activation/tab1',
            pathMatch: 'full'
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthenticateRoutingModule {
}
