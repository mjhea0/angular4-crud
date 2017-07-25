import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DogService {

  constructor(private http: Http) { }

  getAllDogs() {
    return new Promise((resolve, reject) => {
      this.http.get('https://barkwire-api.herokuapp.com/dogs')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res.dogs);
        }, (err) => {
          reject(err);
        });
    });
  }

  showDog(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/dog/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res.dog)
        }, (err) => {
          reject(err);
        });
    });
  }

}
