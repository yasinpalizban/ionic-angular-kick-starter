import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  flag: boolean;

  constructor() {
    this.flag = false;
  }

  public show(): void {
    this.flag = true;
  }

  public hide(): void {
    this.flag = false;
  }
}
