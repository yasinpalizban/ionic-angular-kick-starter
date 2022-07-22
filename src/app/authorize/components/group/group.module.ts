import {NgModule} from '@angular/core';
import {GroupRoutingModule} from './group-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {GroupComponent} from './group.component';
 import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
 import {DetailComponent} from './detail/detail.component';

@NgModule({
  declarations: [

    GroupComponent,

     EditComponent,

     AddComponent,

    ListComponent,


     DetailComponent
  ],
  imports: [
    SharedModule,
    GroupRoutingModule,

  ]
})
export class GroupModule {
}
