import { Injectable } from '@angular/core';
import {Booking} from '../models/booking'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  bookings: Array<Booking>;
  public bookingId: number;
  newBooking: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  getListItems() {
    return this.bookings;
  }

  getAllBookings() {
    return new Promise((resolve, reject) => {
      this.httpClient
      .get("http://localhost:5000/api/bookings/getAllBookings")
      .subscribe(
        (response: Booking[]) => {
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject(err.msg)
        }
      )
    })
  }

  getBookingById(id) {
    return new Promise((resolve, reject) => {
      this.httpClient
      .get(`http://localhost:5000/api/bookings/${id}`)
      .subscribe(
        (response: Booking[]) => {
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject(err.msg)
        }
      )
    })
  }

  getBookingByListingId(id) {
    return new Promise((resolve, reject) => {
      this.httpClient
      .get('http://localhost:5000/api/bookings/getByListingId/' + id)
      .subscribe(
        (response: Booking[]) => {
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
      .post(`http://localhost:5000/api/booking/remove/${id}`, id)
      .subscribe(
        (response: Booking[]) => {
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject(err.msg)
        }
      )
    })
  }

  updateBookingById(id, updatedListing) {
    return new Promise((resolve, reject) => {
      this.httpClient
      .post(`http://localhost:5000/api/bookings/update/${id}`, updatedListing)
      .subscribe(
        (response: Booking[]) => {
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject(err.msg)
        }
      )
    })
  }

  setBookingId(id) {
    this.bookingId = id;
  }

}
