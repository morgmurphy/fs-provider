import { Injectable } from '@angular/core';
import {Listing} from '../models/listing'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  listings: Array<Listing>;
  public listingId: number;
  newListing: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  getListItems() {
    return this.listings;
  }

  getAllListings() {
    return new Promise((resolve, reject) => {
      this.httpClient
      .get("http://localhost:5000/api/listings/getAllListings")
      .subscribe(
        (response: Listing[]) => {
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject(err.msg)
        }
      )
    })
  }

  getListingByProviderId(id) {
    return new Promise((resolve, reject) => {
      this.httpClient
      .get('http://localhost:5000/api/listings/getByProviderId/' + id)
      .subscribe(
        (response: Listing[]) => {
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject(err.msg)
        }
      )
    })
  }

  getListingById(id) {
    return new Promise((resolve, reject) => {
      this.httpClient
      .get(`http://localhost:5000/api/listings/${id}`)
      .subscribe(
        (response: Listing[]) => {
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject(err.msg)
        }
      )
    })
  }

  removeById(id) {
    return new Promise((resolve, reject) => {
      this.httpClient
      .post(`http://localhost:5000/api/listings/remove/${id}`, id)
      .subscribe(
        (response: Listing[]) => {
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject(err.msg)
        }
      )
    })
  }

  updateListingById(id, updatedListing) {
    return new Promise((resolve, reject) => {
      this.httpClient
      .post(`http://localhost:5000/api/listings/update/${id}`, updatedListing)
      .subscribe(
        (response: Listing[]) => {
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject(err.msg)
        }
      )
    })
  }

  createListing(authUser) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders();

      this.httpClient
        .post('http://localhost:5000/api/listings/', authUser, { headers })
        .subscribe(
          (response: any) => {
            console.log(response.id);
            this.newListing = response;
            localStorage.setItem('name', authUser.name);
            localStorage.setItem('location', authUser.location);
            localStorage.setItem('description', authUser.description);
            localStorage.setItem('price', authUser.price);
            resolve(response);
          },
          (err) => {
            console.log(err);
            reject(err);
          }
        );
    })

  }

  setLoggedInUser(listing: any) { 
    this.newListing = listing;
  }

  getLoggedInUser(): any { 
    return this.newListing;
  }
  setListingId(id) {
    this.listingId = id;
  }
}
