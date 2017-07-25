import { Component, OnInit } from '@angular/core';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent implements OnInit {

  dogs: any;

  constructor(private dogService: DogService) { }

  ngOnInit() {
    this.getDogList();
  }

  getDogList() {
    this.dogService.getAllDogs().then((res) => {
      console.log(res)
      this.dogs = res;
    }, (err) => {
      console.log(err);
    });
  }

}
