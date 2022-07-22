import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {NotFoundPageComponent} from './shared/components/not-found-page/not-found-page.component';
import {ForbiddenPageComponent} from './shared/components/forbidden-page/forbidden-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/home/sign-in', pathMatch: 'full'},
  {path: 'admin', loadChildren: () => import(`./admin-area/admin.area.module`).then(m => m.AdminAreaModule)},
  {path: 'home', loadChildren: () => import(`./web-site/web.site.module`).then(m => m.WebSiteModule)},
  {path: '404', component: NotFoundPageComponent},
  {path: '403', component: ForbiddenPageComponent},
  {path: '**', redirectTo: '/404'},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
