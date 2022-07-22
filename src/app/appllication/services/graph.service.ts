import {Injectable} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {IApiCommonFunction} from "../../shared/interfaces/api.common.function.service.interface";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "../../shared/services/alert.service";
import {ErrorService} from "../../shared/services/error.service";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../environments/environment";
import {IGraph} from "../interfaces/graph.interface";
import {Graph} from "../models/graph.model";

@Injectable({
  providedIn: 'root'
})
export class GraphService extends ApiService<IGraph> implements IApiCommonFunction {

  constructor(protected httpClient: HttpClient,
              protected alertService: AlertService,
              protected errorService: ErrorService,
              protected translate: TranslateService,
  ) {
    super(httpClient,
      alertService,
      errorService,
      environment.baseUrl + 'graph',
      translate);
  }


  query(argument?: number | string | object): void {
    this.subscription.push(super.get(argument).subscribe((setting) => {
      this.dataSubject.next(setting);
    }));
  }

  save(graph: Graph): void {

    this.subscription.push(this.post(graph).subscribe((data) => {
      this.alertService.clear();
      this.dataSubject.next(data);
    }));
  }


}
