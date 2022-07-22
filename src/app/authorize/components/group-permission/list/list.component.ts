import {Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';


import {ActivatedRoute, Params, Router} from '@angular/router';

import {IQuery} from '../../../../shared/interfaces/query.interface';

import {IGroupPermission} from '../../../interfaces/group.permission.interface';
import {GroupPermissionService} from '../../../services/group.permission.service';
import {AlertController, IonModal} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-permission-group-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;
  subscription$: Subscription[];
  permissionGroupRows!: IGroupPermission;
  totalPage: number;
  currentPage: number;
  sizePage: number;
  targetId: number;
  deleteIndex: number;
  deleteItem: string;
  messageConfirm: string;
  messageCancel: string;
  messageDelete: string;


  constructor(private permissionGroupService: GroupPermissionService,
              private router: Router,
              private alertController: AlertController,
              private translate: TranslateService,
              private activatedRoute: ActivatedRoute
  ) {


    this.currentPage = 1;
    this.totalPage = 1;
    this.sizePage = 10;
    this.targetId = 0;
    this.deleteIndex = 0;
    this.subscription$ = [];
    this.deleteItem = '';
    this.messageDelete='';
    this.messageConfirm='';
    this.messageCancel='';
  }
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.currentPage !== (+this.activatedRoute.snapshot.queryParams.page)) {
      this.currentPage = this.activatedRoute.snapshot.queryParams.page ? +this.activatedRoute.snapshot.queryParams.page : 1;

    }

  }
  ngOnInit(): void {


    this.subscription$.push(this.activatedRoute.queryParams.subscribe((params: Params) => {

      if (Object.keys(params).length !== 0) {
        this.permissionGroupService.query(params);
      } else {
        this.permissionGroupService.query();
      }
      this.permissionGroupService.setQueryArgument(params);
    }));


    this.subscription$.push(this.permissionGroupService.getDataObservable().subscribe((permission: IGroupPermission) => {
      this.permissionGroupRows = permission;

      if(permission.pager){
        this.totalPage = permission.pager!.total;

        this.currentPage = permission.pager!.currentPage;

      }

    }));

    this.subscription$.push(this.translate.get(['common.doYouWantDelete']).subscribe(result => this.messageDelete = result['common.doYouWantDelete']));
    this.subscription$.push(this.translate.get(['common.confirm']).subscribe(result => this.messageConfirm = result['common.confirm']));
    this.subscription$.push(this.translate.get(['common.cancel']).subscribe(result => this.messageCancel = result['common.cancel']));

  }

  ngOnDestroy(): void {
    this.subscription$.forEach(sub => sub.unsubscribe());
    this.permissionGroupService.unsubscribe();

  }


  onEditItem(): void {


    const params: IQuery = {
      page: this.currentPage,
    };


    this.subscription$.push(this.permissionGroupService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {
      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;
    }));

    this.permissionGroupService.setQueryArgument(params);
    this.router.navigate(['./admin/group-permission/edit/' + this.targetId]);
  }

  onDetailItem(id: number): void {

    this.router.navigate(['./admin/group-permission/detail/' + id]);
  }

  onOpenModal( id: number, index: number): void {

    this.modal.present();
    this.targetId = id;
    this.deleteIndex = index;
    this.deleteItem = this.permissionGroupRows.data![index].id.toString();

  }


  onModalConfirm(): void {
    this.permissionGroupService.remove(this.targetId);
    this.permissionGroupRows.data!.splice(this.deleteIndex, 1);
  }


  onCancelModal() {
    this.modal.dismiss(null, 'cancel');
  }

  async  onAlert() {
    this.modal.dismiss(null, 'cancel');
    const alert = await this.alertController.create({
      header: this.messageDelete,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: this.messageCancel,
          cssClass: 'alert-button-cancel'
        },
        {
          handler: this.onModalConfirm,
          text: this.messageConfirm,
          cssClass: 'alert-button-confirm'
        }
      ]
    });

    await alert.present();

  }

}
