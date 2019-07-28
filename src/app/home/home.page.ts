import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AuthService } from "../services/auth.service";
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public user = new User();
  public email: string;
  public password: string; 
  public users: any;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private userService: UserService,
    private authService: AuthService
  ) {}

  navToNew() {
    this.navCtrl.navigateForward("new");
  }

  navToProfile() {
    this.navCtrl.navigateForward("profile");
  }
  
  
  getProviders(){
    this.userService.getAllProviders().then(res =>{
      this.users = res;
    }).catch(err=>{console.log(err)})
  }

  ngOnIt() {
    this.getProviders
  }

  login() {
    const authUser = {
      email: this.email,
      password: this.password
    }
    this.authService.login(authUser).then(res => {
  
      const testId = localStorage.getItem('providerId');
      console.log(testId)
  
      this.navCtrl.navigateForward('existing', {
        queryParams: {
          user: res
        }
      });
    }).catch(err => {
      this.presentAlert(err);
    });
  }
  
  register() {
    this.navCtrl.navigateForward("registration");
  }

  async presentAlert(err) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Failed to login',
      message: err,
      buttons: ['OK']
    });
  
    await alert.present();
  }

}
