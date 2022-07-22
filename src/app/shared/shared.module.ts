import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {ForbiddenPageComponent} from './components/forbidden-page/forbidden-page.component';
import {AlertComponent} from './components/alert/alert.component';
import {ConvertDatePipe} from './pipes/convert.date.pipe';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    RouterModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [RouterModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    NotFoundPageComponent,
    ForbiddenPageComponent,
    AlertComponent,
    ConvertDatePipe,
    TranslateModule],
  declarations: [
    SpinnerComponent,
    NotFoundPageComponent,
    ForbiddenPageComponent,
    AlertComponent,
    ConvertDatePipe]
})
export class SharedModule {
}
