import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import {AuthService } from '../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  firstName: string;
  lastName: string;
  email: string;

  constructor(
    private NavCtrl: NavController,
    private toastCtrl: ToastController,
    private userService: UserService,
    private authService: AuthService,
  ) { 
    this.userService.getUserById(localStorage.getItem('providerId')).then(user => {
      console.log(user)
      this.firstName = user[0].firstName; 
      this.lastName = user[0].lastName;
      this.email = user[0].email;
  })
}

  ngOnInit() {
  }

  navToNew() {
    this.NavCtrl.navigateForward("new");
  }
  navToRentalDetails() {
    this.NavCtrl.navigateForward("rental-details");
  }
  navToUpdateRental() {
    this.NavCtrl.navigateForward("update-rental");
  }
  navToExisting() {
    this.NavCtrl.navigateForward("existing");
  }
  navToBookings() {
    this.NavCtrl.navigateForward("bookings");
  }

  async presentToast(name) {
    const toast = await this.toastCtrl.create({
      message: 'Welcome ' + name + '!',
      duration: 2000
    });
    toast.present();
  }
}
