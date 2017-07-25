import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-dog-detail',
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css']
})
export class DogDetailComponent implements OnInit {

  dog = {};

  constructor(private route: ActivatedRoute, private dogService: DogService) { }

  ngOnInit() {
    this.getDogDetail(this.route.snapshot.params['id']);
  }

  getDogDetail(id) {
    this.dogService.showDog(id).then((res) => {
      this.dog = res;
      console.log(this.dog);
    }, (err) => {
      console.log(err);
    });
  }

}
