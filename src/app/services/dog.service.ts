import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const baseURL = 'https://barkwire-api.herokuapp.com';

@Injectable()
export class DogService {

  constructor(private http: Http) {
    console.log('Service is wired up correctly!')
  }

  getAllDogs() {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseURL}/dogs`)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res.dogs);
        }, (err) => {
          reject(err);
        });
    });
  }

}
