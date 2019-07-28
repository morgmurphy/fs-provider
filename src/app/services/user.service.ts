import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Array<any>;
  loggedInUser: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProviders() {
    return new Promise((resolve, reject) => {
      this.httpClient
      .get("http://localhost:5000/api/provider/getAllProviders")
      .subscribe(
        (response) => {
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject(err.msg)
        }
      )
    })
  }
  
  getUserById(id) {
    console.log(`http://localhost:5000/api/provider/${id}`)
    return new Promise((resolve, reject) => {
      //debugger
      this.httpClient
      .get(`http://localhost:5000/api/provider/${id}`)
      .subscribe(
        (response) => {
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject(err.msg)
        }
      )
    })
  }
}
