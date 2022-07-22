import {Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {SettingService} from '../../../services/setting.service';
import {ISetting} from '../../../interfaces/setting.interface';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IQuery} from '../../../../shared/interfaces/query.interface';
import {AlertController, IonModal} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-setting-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],


})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;

  subscription$: Subscription[];
  settingRows!: ISetting;
  totalPage: number;
  currentPage: number;
  sizePage: number;
  targetId: number;
  deleteIndex: number;
  deleteItem: string;
messageConfirm: string;
messageCancel: string;
messageDelete: string;

  constructor(private settingService: SettingService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertController: AlertController,
              private translate: TranslateService,
  ) {

    this.currentPage = 1;
    this.totalPage = 1;
    this.sizePage = 10;
    this.targetId = 0;
    this.deleteIndex = 0;
    this.deleteItem = '';
    this.subscription$ = [];
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
        this.settingService.query(params);
      } else {
        this.settingService.query();
      }
      this.settingService.setQueryArgument(params);
    }));


    this.subscription$.push(this.settingService.getDataObservable().subscribe((settings) => {
      this.settingRows = settings;

      if(settings.pager){
        this.totalPage = settings.pager!.total;
        this.currentPage = settings.pager!.currentPage;
      }


    }));


    this.subscription$.push(this.translate.get(['common.doYouWantDelete']).subscribe(result => this.messageDelete = result['common.doYouWantDelete']));
    this.subscription$.push(this.translate.get(['common.confirm']).subscribe(result => this.messageConfirm = result['common.confirm']));
    this.subscription$.push(this.translate.get(['common.cancel']).subscribe(result => this.messageCancel = result['common.cancel']));

  }

  ngOnDestroy(): void {
    this.subscription$.forEach(sub => sub.unsubscribe());
    this.settingService.unsubscribe();

  }


  onEditItem(): void {
    const params: IQuery = {
      page: this.currentPage
    };


    this.subscription$.push(this.settingService.getQueryArgumentObservable().subscribe((qParams) => {
      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;
    }));

    this.settingService.setQueryArgument(params);
    this.router.navigate(['./admin/setting/edit/' + this.targetId]);
  }

  onDetailItem( id?: number): void {

   id= id ? id:this.targetId;
   this.router.navigate(['./admin/setting/detail/' + id]);
  }

  onOpenModal( id: number, index: number): void {

    this.modal.present();
    this.targetId = id;
    this.deleteIndex = index;
    this.deleteItem = this.settingRows.data![index].key;

  }


  onModalConfirm(): void {
    this.settingService.remove(this.targetId);
    this.settingRows.data?.splice(this.deleteIndex, 1);
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
