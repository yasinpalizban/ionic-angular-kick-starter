import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../../services/profile.service";
import {Subscription} from "rxjs";
import {IProfile} from "../../../interfaces/profile.interface";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Profile} from "../../../models/profile.model";
import {environment} from "../../../../../environments/environment";
import {HeaderService} from "../../../../admin-area/services/header.service";

@Component({
  selector: 'app-user-info',
  templateUrl: 'user.info.component.html',
  styleUrls: ['user.info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  submitted = false;
  editAble = true;
  subscription: Subscription[];
  profileDetail: IProfile = {};
  image: SafeUrl | string;
  isNewImage: boolean;
  formData = new FormData();
  constructor(private navController: NavController,private route: Router,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer,
              private profileService: ProfileService,
              private  headerService: HeaderService) {
    this.submitted = false;
    this.subscription = [new Subscription()];
    this.isNewImage = false;
    this.image = 'assets/images/icon/default-avatar.jpg';
  }
  goBack() {
    this.navController.back();
  }
  public getSantizeUrl(url: SafeUrl | string): SafeUrl | string {

    if (url.toString().indexOf('assets') !== -1 || this.isNewImage) {
      return this.image;
    } else {

      return this.sanitizer.bypassSecurityTrustUrl(environment.siteUrl + url);

    }
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]), username: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      gender: new FormControl('', [
        Validators.required,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      bio: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      image: [null],
    });
    this.profileService.query();
    this.subscription.push(
      this.profileService.getDataObservable().subscribe((profile: IProfile) => {
        this.profileDetail = profile;
        this.formGroup.controls.firstName.setValue(profile.data?.firstName);
        this.formGroup.controls.lastName.setValue(profile.data?.lastName);
        this.formGroup.controls.gender.setValue(profile.data?.gender);
        this.formGroup.controls.phone.setValue(profile.data?.phone);
        this.formGroup.controls.email.setValue(profile.data?.email);
        this.formGroup.controls.username.setValue(profile.data?.userName);
        this.formGroup.controls.bio.setValue(profile.data?.bio);
        this.formGroup.controls.title.setValue(profile.data?.title);

        this.formGroup.controls.username.disable();
        if (profile?.data!.phone) {
          this.formGroup.controls.phone.disable();
        }
        if (profile?.data!.email) {
          this.formGroup.controls.email.disable();
        }
        if (profile.data!.image != null) {

          this.image = profile.data!.image;

        }


      })
    );

    this.subscription.push(this.headerService.getConfirmButton().subscribe(x=>{
      if(x=='user-info'){
        this.onSubmit();
      }
    }));

  }

  onSubmit(): void {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;

    const profile = new Profile({
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      gender: this.formGroup.value.gender,
      phone: this.formGroup.value.phone
    });

    this.profileService.save(profile);

    if (this.isNewImage === true) {
      this.profileService.save(this.formData);

    }


  }

  ngOnDestroy(): void {

    this.subscription.forEach(x=>x.unsubscribe());
    this.profileService.unsubscribe();
  }


  updateImage($event: Event): void {

    // const fileReader = new FileReader();
    // const element = $event.currentTarget as HTMLInputElement;
    // this.image = this.sanitizer.bypassSecurityTrustUrl(
    //   window.URL.createObjectURL(element.files[0])
    // );
    // this.formGroup.patchValue({
    //   image: element.files[0]
    // });
    // this.formGroup.query('image').updateValueAndValidity();
    // File Preview
    // const reader = new FileReader();
    // let preview = "";
    // reader.onload = () => {
    //   preview = reader.result as string;
    // }
    // reader.readAsDataURL(element.files[0])


    const file = ($event.target as HTMLInputElement).files![0];

    this.formGroup.get('image')!.updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    const preview = '';
    reader.onload = () => {
      this.image = reader.result as string;
      this.formData.append('image', file, file.name);
      //  this.formData.append('"_method', "PUT");
      this.isNewImage = true;
    };
    reader.readAsDataURL(file);
  }

}
