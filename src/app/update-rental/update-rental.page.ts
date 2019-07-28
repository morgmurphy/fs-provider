import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ListingsService } from '../services/listings.service';
import { AlertController } from '@ionic/angular';
import { Listing } from '../models/listing';

@Component({
  selector: 'app-update-rental',
  templateUrl: './update-rental.page.html',
  styleUrls: ['./update-rental.page.scss'],
})
export class UpdateRentalPage implements OnInit {
  listingVar: Listing
  serviceProviderId: string;
  name: string;
  location: string;
  price: number;
  description: string;
  public listings: any;
  
  public deleteId: string;

  constructor(
    private NavCtrl: NavController,
    private alertCtrl: AlertController,
    private listingsService: ListingsService,
  ) {
      this.deleteId = localStorage.getItem("listingId");

      console.log(this.deleteId)
      this.listingsService.getListingById(this.deleteId).then((listing: any) => {
        this.listingVar = listing[0];
        this.serviceProviderId= this.listingVar.serviceProviderId;
        this.name = this.listingVar.name;
        this.location = this.listingVar.location;
        this.price = this.listingVar.price;
        this.description = this.listingVar.description;
      })
      
  }

  ionViewWillEnter() {

  }

  navToExisting() {
    this.NavCtrl.navigateForward("existing");
  }
  navToNew() {
    this.NavCtrl.navigateForward("new");
  }
  navToRentalDetails() {
    this.NavCtrl.navigateForward("rental-details");
  }

  navToProfile() {
    this.NavCtrl.navigateForward("profile");
  }

  removeListing() {
    this.listingsService.removeById(this.deleteId).then(res => {

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
      subHeader: 'Failed to delete',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
  }

  edit() {
    const editListing = {
      serviceProviderId: this.serviceProviderId,
      name: this.listingVar.name,
      location: this.location,
      price: this.price,
      description: this.description,
  
    }
    this.listingsService.updateListingById(this.deleteId, editListing).then(res => {
  
      const testId = localStorage.getItem('listingId');
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

}

