import { Component, OnInit } from '@angular/core';
import { DogService } from '../../services/dog.service';

// component meta data
@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})

// component class
export class DogComponent implements OnInit {

  dogs: {}; // why "any"? lazy

  // inject data service dependency
  constructor(private dogService: DogService) { }

  ngOnInit() {
    this.getDogList();
  }

  getDogList() {
    // resolve the promise
    this.dogService.getAllDogs().then((res) => {
      console.log(res)
      this.dogs = res;
    }, (err) => {
      console.log(err);
    });
  }

}
