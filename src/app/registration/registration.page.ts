import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AuthService } from "../services/auth.service"
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string
  cellphone: string;
  public users: any;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register() {
    const authUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      cellPhone: this.cellphone,
      email: this.email,
      password: this.password,
      role: this.role

    }
    this.authService.register(authUser).then(res => {
  
      const testId = localStorage.getItem('userId');
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
