import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleType} from '../../../shared/enums/role.enum';
import {PermissionType} from '../../../shared/enums/permission.enum';
import {OverViewComponent} from './over-view/over-view.component';
import {GraphComponent} from './graph/graph.component';
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
        path: 'over-view',
        component: OverViewComponent,
        canActivate: [AuthActivateChildGuard],
        data: {
          roles: [RoleType.Admin,RoleType.Coworker, RoleType.Blogger],
          permission: PermissionType.Get,
          permissionName: 'over-view'

        },
      },
      {
        path: 'graph',
        component: GraphComponent,
        canActivate: [AuthActivateChildGuard],
        data: {
          roles: [RoleType.Admin,RoleType.Coworker, RoleType.Blogger],
          permission: PermissionType.Get,
          permissionName: 'graph'

        },
      },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
