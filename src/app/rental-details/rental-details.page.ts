import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ListingsService } from "../services/listings.service"
import {Listing} from "../models/listing"

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.page.html',
  styleUrls: ['./rental-details.page.scss'],
})
export class RentalDetailsPage implements OnInit {
  listing: Listing;
  constructor(
    private NavCtrl: NavController,
    private listingService: ListingsService,
  ) { 
    this.listingService.getListingById(this.listingService.listingId).then((listing: any) => {
      this.listing = listing[0];
    })
    localStorage.setItem("listingId", String(this.listingService.listingId))
  }

  navToExisting() {
    this.NavCtrl.navigateForward("existing");
  }
  navToNew() {
    this.NavCtrl.navigateForward("new");
  }
  navToUpdateRental() {
    this.NavCtrl.navigateForward("update-rental");
  }

  navToBookings() {
    this.NavCtrl.navigateForward("bookings");
  }

  edit() {
    this.NavCtrl.navigateForward("update-rental");
  }
  ngOnInit() {
  }

}
