import { NgModule } from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule} from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AdminAreaModule} from './admin-area/admin.area.module';
import {WebSiteModule} from './web-site/web.site.module';
import {InternationalizationModule} from './shared/translate/internationalization.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HeaderInterceptor} from './shared/interceptors/header-interceptor.service';
import {ErrorInterceptor} from './shared/interceptors/error.interceptor';
import {CsrfInterceptor} from './shared/interceptors/csrf.interceptor';
import {SharedModule} from './shared/shared.module';

import {environment} from '../environments/environment';
import {IonicGestureConfig} from './shared/configs/ionic.gesture.config';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function httpLoaderFactory(http: HttpClient) {
  // @ts-ignore
  return new TranslateHttpLoader( http, '../assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InternationalizationModule.forRoot({localeId: 'en'}),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    AppRoutingModule,
  AdminAreaModule,
  WebSiteModule,
    HammerModule,
    // SocialLoginModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true},
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
