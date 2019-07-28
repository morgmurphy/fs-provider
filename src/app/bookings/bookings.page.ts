import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BookingsService } from "../services/bookings.service"
import {Booking} from "../models/booking"
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  public bookings: any;
  public listingId: string;
  date_from: string;
  date_to: string;
  user_id: string;
  listing_id: string;
  status: string;


  constructor(
    private NavCtrl: NavController,
    private alertCtrl: AlertController,
    private bookingsService: BookingsService,
  ) { 
    this.listingId = localStorage.getItem('listingId');

    this.bookingsService.getBookingByListingId(this.listingId).then((booking: any) => {
      this.bookings = booking;
      this.date_from= this.bookings.date_from;
      this.date_to= this.bookings.date_to;
      this.listing_id = this.bookings.listing_id;
      this.user_id = this.bookings.user_id;
      this.status = this.bookings.status;



    })
  }

  ngOnInit() {
  }

  findPropertyById(id) {
    this.bookingsService.setBookingId(id)
    this.NavCtrl.navigateForward("profile");
  }

  reject() {
    const editBooking = {
      status: "reject",
      date_from: this.date_from,
      date_to: this.date_to,
      listing_id: this.listing_id,
      user_id: this.user_id,

  
    }
    this.bookingsService.updateBookingById(this.listingId, editBooking).then(res => {
  
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

  accept() {

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

}
