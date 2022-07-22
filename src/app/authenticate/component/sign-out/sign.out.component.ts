import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from "../../services/authenticate.service";

@Component({
  selector: 'app-out',
  templateUrl: 'sign.out.component.html',
  styleUrls: ['sign.out.component.scss']
})
export class SignOutComponent implements OnInit{

  constructor(private authenticateService: AuthenticateService, ) {}
ngOnInit() {
    this.authenticateService.signOut();
}
}
