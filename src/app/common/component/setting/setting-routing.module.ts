import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoleType} from '../../../shared/enums/role.enum';
import {SettingComponent} from './setting.component';
import {PermissionType} from '../../../shared/enums/permission.enum';
import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {AuthActivateChildGuard} from '../../../shared/guards/auth.activate.child.guard';
import {AuthActivateGuard} from '../../../shared/guards/auth.activate.guard';
import {AdminAreaComponent} from '../../../admin-area/admin.area.component';


const routes: Routes = [

  {
    path: '',
    component: AdminAreaComponent,
    canActivate: [AuthActivateGuard],

    children: [
      {
        path: 'setting',
        component: SettingComponent,
        canActivate: [AuthActivateChildGuard],
        data: {
          roles: [RoleType.Admin],
          permission: PermissionType.Get,
          permissionName: 'setting'

        },
        children: [

          {
            path: 'add',
            component: AddComponent,
            canActivate: [AuthActivateChildGuard],
            data: {
              roles: [RoleType.Admin],
              permission: PermissionType.Post,
              permissionName: 'setting'

            },
          },
          {
            path: 'edit/:id',
            component: EditComponent,
            canActivate: [AuthActivateChildGuard],
            data: {
              roles: [RoleType.Admin],
              permission: PermissionType.Put,
              permissionName: 'setting'

            },
          },
          {
            path: 'list',
            component: ListComponent,
            canActivate: [AuthActivateChildGuard],
            data: {
              roles: [RoleType.Admin],
              permission: PermissionType.Get,
              permissionName: 'setting'

            },
          },
          {
            path: 'detail/:id',
            component: DetailComponent,
            canActivate: [AuthActivateChildGuard],
            data: {
              roles: [RoleType.Admin],
              permission: PermissionType.Get,
              permissionName: 'setting'

            },
          }
        ]
      },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
}
