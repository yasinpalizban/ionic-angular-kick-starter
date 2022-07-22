import {NgModule} from '@angular/core';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {UserComponent} from './user.component';
import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';


@NgModule({
  declarations: [

    UserComponent,
    EditComponent,
    AddComponent,
    ListComponent,
    DetailComponent,
],
  imports: [
    SharedModule,
    UserRoutingModule,

  ]
})
export class UserModule {
}
