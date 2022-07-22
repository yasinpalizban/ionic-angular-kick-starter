import {NgModule} from '@angular/core';
import {WebSitePageRoutingModule} from './web.site-routing.module';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {WebSiteComponent} from './web.site.component';
import {AuthenticateModule} from '../authenticate/component/authenticate.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    AuthenticateModule,
    WebSitePageRoutingModule,

  ],
  declarations: [
    WebSiteComponent,
    HeaderComponent,
    FooterComponent]
})
export class WebSiteModule {
}
