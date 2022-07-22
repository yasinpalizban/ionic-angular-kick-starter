import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {GraphComponent} from './graph/graph.component';
import {OverViewComponent} from './over-view/over-view.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [

    GraphComponent,
    OverViewComponent

  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    NgxChartsModule

  ]
})
export class DashboardModule {
}
