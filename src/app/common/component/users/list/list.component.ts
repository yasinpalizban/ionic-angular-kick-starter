import {Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user.service';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {IQuery} from '../../../../shared/interfaces/query.interface';
import {IUser} from '../../../interfaces/user.interface';
import {HttpParams} from '@angular/common/http';
import {ISearch} from '../../../../shared/interfaces/search.interface';
import {RoleType} from '../../../../shared/enums/role.enum';
import {FunctionSearchType} from '../../../../shared/enums/function.search.enum';
import {AlertController, IonModal} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {GroupService} from "../../../../authorize/services/group.service";
import {IGroup} from "../../../../authorize/interfaces/group.interface";


@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;
  subscription$: Subscription[];
  userRows!: IUser;
  groupRows!: IGroup;
  totalPage: number;
  currentPage: number;
  sizePage: number;
  targetId: number;
  deleteIndex: number;
  deleteItem: string;
  messageConfirm: string;
  messageCancel: string;
  messageDelete: string;

  customAlertOptions = {
    header: 'Groups',
    message: 'Choose only one',
    translucent: true
  };

  constructor(private userService: UserService,
              private groupService: GroupService,
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
      let queryParam = new HttpParams();
      const searchRule: ISearch = {
        fun: FunctionSearchType.Where,
        sgn: '=',
        jin: 'GroupModel',
        val: RoleType.Member
      };

      queryParam = queryParam.append('name', JSON.stringify(searchRule));
      const query: IQuery = {
        q: queryParam
      };
      if (Object.keys(params).length !== 0) {
        this.userService.query(params);
        this.userService.setQueryArgument(params);
      } else {
        this.userService.query(query);
        this.userService.setQueryArgument(query);

      }

    }));


    this.subscription$.push(this.userService.getDataObservable().subscribe((users: IUser) => {
      this.userRows = users;

      if(users.pager){
        this.totalPage = users.pager!.total;

        this.currentPage = users.pager!.currentPage;

      }

    }));

    this.subscription$.push(this.translate.get(['common.doYouWantDelete']).subscribe(result => this.messageDelete = result['common.doYouWantDelete']));
    this.subscription$.push(this.translate.get(['common.confirm']).subscribe(result => this.messageConfirm = result['common.confirm']));
    this.subscription$.push(this.translate.get(['common.cancel']).subscribe(result => this.messageCancel = result['common.cancel']));
    this.subscription$.push(this.translate.get(['filed.group']).subscribe(result => this.customAlertOptions.header = result['filed.group']));

    this.groupService.query();
    this.subscription$.push(this.groupService.getDataObservable().subscribe((data:IGroup)=>{
      this.groupRows= data;
    }));

  }

  ngOnDestroy(): void {
    this.subscription$.forEach(sub => sub.unsubscribe());
    this.userService.unsubscribe();

  }


  onEditItem(): void {
    const params: IQuery = {
      page: this.currentPage
    };


    this.subscription$.push(this.userService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {
      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;
    }));

    this.userService.setQueryArgument(params);
    this.router.navigate(['./admin/user/edit/' + this.targetId]);
  }

  onDetailItem(id?: number): void {
    id= id ? id:this.targetId;
    this.router.navigate(['./admin/user/detail/' + id]);
  }

  onOpenModal( id: number, index: number): void {

    this.modal.present();
    this.targetId = id;
    this.deleteIndex = index;
    this.deleteItem = this.userRows.data![index].username;

  }


  onModalConfirm(): void {

    this.userService.remove(this.targetId);
    this.userRows.data!.splice(this.deleteIndex, 1);
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


  onChangeGroup(e: any) {

    let queryParam = new HttpParams();
    const searchRule: ISearch = {
      fun: FunctionSearchType.Where,
      sgn: '=',
      jin: 'GroupModel',
      val:  e.detail.value
    };

    queryParam = queryParam.append('name', JSON.stringify(searchRule));
    const query: IQuery = {
      q: queryParam
    };
    this.userService.query(query);

  }
}
