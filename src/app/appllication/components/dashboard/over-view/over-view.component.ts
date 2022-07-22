import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';
import { OverViewService } from 'src/app/appllication/services/over.view.service';
import {IOverView} from '../../../interfaces/over.view.interface';
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.scss']
})
export class OverViewComponent implements OnInit, OnDestroy {

  overViewRows!: IOverView;
  subscription: Subscription;

  constructor(private overViewService: OverViewService,private menu: MenuController) {
    this.subscription = new Subscription();


  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit(): void {
    this.overViewService.query();
    this.subscription = this.overViewService.getDataObservable().subscribe((data: IOverView) => {
      this.overViewRows = data;
    });
  }

  ngOnDestroy(): void {
    this.overViewService.unsubscribe();
    this.subscription.unsubscribe();
  }

}
