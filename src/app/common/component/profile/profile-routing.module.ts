import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from './profile.component';
import {UserInfoComponent} from './user-info/user.info.component';
import {UserAddressComponent} from './user-address/user.address.component';
import {UserPasswordComponent} from './user-password/user.password.component';
import {AdminAreaComponent} from '../../../admin-area/admin.area.component';
import {AuthActivateGuard} from '../../../shared/guards/auth.activate.guard';


const routes: Routes = [
  {
    path: '',
    component: AdminAreaComponent,
    canActivate: [AuthActivateGuard], children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'user-info', component: UserInfoComponent},
      {path: 'user-address', component: UserAddressComponent},
      {path: 'user-password', component: UserPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ProfileRoutingModule {}
