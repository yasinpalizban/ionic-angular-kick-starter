
import {NgModule} from '@angular/core';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {AdminAreaComponent} from './admin.area.component';
import {AdminAreaPageRoutingModule} from './admin.area-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ProfileModule} from '../common/component/profile/profile.module';
import {DashboardModule} from '../appllication/components/dashboard/dashboard.module';
import {SettingModule} from '../common/component/setting/setting.module';
import {UserModule} from '../common/component/users/user.module';
import {GroupModule} from '../authorize/components/group/group.module';
import {PermissionModule} from '../authorize/components/permission/permission.module';
import {GroupPermissionModule} from "../authorize/components/group-permission/group.permission.module";
import {UserPermissionModule} from "../authorize/components/user-permission/user.permission.module";


@NgModule({
  imports: [
    SharedModule,
    AdminAreaPageRoutingModule,
    DashboardModule,
    ProfileModule,
    SettingModule,
    UserModule,
    GroupModule,
    PermissionModule,
    GroupPermissionModule,
    UserPermissionModule
  ],
  declarations: [
    AdminAreaComponent,
    HeaderComponent,
    FooterComponent]
})
export class AdminAreaModule {
}
