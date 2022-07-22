import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {



  constructor(private navController: NavController,private route: Router) {
  }

ngOnInit() {
}

  goBack() {
    this.navController.back();
  }


}
