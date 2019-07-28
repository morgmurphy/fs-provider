import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { ListingsService } from "../services/listings.service"
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  name: string;
  price: string;
  description: string;
  location: string;
  serviceProvider: number;

  constructor(
    private NavCtrl: NavController,
    private alertCtrl: AlertController,
    private userService: UserService,
    private listingService: ListingsService
  ) { }

  navToExisting() {
    this.NavCtrl.navigateForward("existing");
  }
  navToProfile() {
    this.NavCtrl.navigateForward("profile");
  }
  navToRentalDetails() {
    this.NavCtrl.navigateForward("rental-details");
  }
  navToUpdateRental() {
    this.NavCtrl.navigateForward("update-rental");
  }

  ngOnInit() {
  }

  createListing() {
    const authUser = {
      name: this.name,
      price: this.price,
      description: this.description,
      location: this.location,
      serviceProviderId: localStorage.getItem("providerId")

    }
    this.listingService.createListing(authUser).then(res => {
  
      const testId = localStorage.getItem('userId');
      console.log(testId)
  
      this.NavCtrl.navigateForward('existing', {
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
