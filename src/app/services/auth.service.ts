import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: Array<any>;
  loggedInUser: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  login(authUser) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders();

      this.httpClient
        .post('http://localhost:5000/api/auth/login/provider', authUser, { headers })
        .subscribe(
          (response: any) => {
            console.log(response.id);
            this.loggedInUser = response;
            localStorage.setItem('providerId', response.id);
            resolve(response);
          },
          (err) => {
            console.log(err);
            reject(err);
          }
        );
    })

  }

  register(authUser) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders();

      this.httpClient
        .post('http://localhost:5000/api/auth/register/provider', authUser, { headers })
        .subscribe(
          (response: any) => {
            console.log(response.id);
            this.loggedInUser = response;
            localStorage.setItem('providerId', authUser.id);
            localStorage.setItem('email', authUser.email);
            localStorage.setItem('password', authUser.password);
            localStorage.setItem('name', authUser.name);
            resolve(response);
          },
          (err) => {
            console.log(err);
            reject(err);
          }
        );
    })

  }
  setLoggedInUser(user: any) { // This should be type user
    this.loggedInUser = user;
  }

  getLoggedInUser(): any { // This should be type user
    return this.loggedInUser;
  }

}
