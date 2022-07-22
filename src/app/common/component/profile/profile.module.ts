import {NgModule} from '@angular/core';
import {ProfileRoutingModule} from './profile-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ProfileComponent} from './profile.component';
import {UserAddressComponent} from './user-address/user.address.component';
import {UserInfoComponent} from './user-info/user.info.component';
import {UserPasswordComponent} from './user-password/user.password.component';


@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    UserAddressComponent,
    UserInfoComponent,
    UserPasswordComponent
  ]
})
export class ProfileModule {
}
