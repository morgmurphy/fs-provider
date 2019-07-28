import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ListingsService } from "../services/listings.service"
import {Listing} from "../models/listing"

@Component({
  selector: 'app-existing',
  templateUrl: './existing.page.html',
  styleUrls: ['./existing.page.scss'],
})
export class ExistingPage implements OnInit {
  public listings: any;
  public providerId: string;

  constructor(
    private NavCtrl: NavController,
    private listingsService: ListingsService,
  ) { 
    this.providerId = localStorage.getItem('providerId');

    this.listingsService.getListingByProviderId(this.providerId).then((listing: any) => {
      this.listings = listing;
    })
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
  navToProfile() {
    this.NavCtrl.navigateForward("profile");
  }

  ngOnInit() {
  }

  findPropertyById(id) {
    this.listingsService.setListingId(id)
    this.NavCtrl.navigateForward("rental-details");
  }
  

}
