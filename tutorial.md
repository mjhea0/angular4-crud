# Angular4Crud Tutorial

## User Stories

1. `As a lonely dog, I want to see a list of all of the dogs that are available so that I can see my dating options.`
1. `As a lonely dog, I want to be able to link to a specific dog so that I can share my favorite dogs with my friends.`

## Setup with Angular CLI

Create new project:

```sh
$ npm install @angular/cli -g
$ ng new APP_NAME && cd APP_NAME
```

Sanity check:

```sh
$ ng serve
```

Git is added.

## All Dogs

`As a lonely dog, I want to see a list of all of the dogs that are available so that I can see my dating options.`

### Define Service

Services are used to encapsulate common functionality so it can be reused.

Create a new service:

```sh
$ ng g service dog
```

To use, this service, add it to the `providers` within *app.module.ts*:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DogService } from './dog.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Update the service itself:

```javascript
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

}
```

ADD TEST

### Create Components

Create a new component:

```sh
$ ng g component dog
```

Sets up the component files and folders, and adds it to *app.module.ts*.

Update the component itself:

```javascript
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
```

Update *dog.component.html*:

```html
<ul>
  <li *ngFor="let dog of dogs" class="dogs">
    {{ dog.name }}
  </li>
</ul>
```

### Configure Routing

Update *app.module.ts*:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { DogService } from './dog.service';
import { DogComponent } from './dog/dog.component';

const ROUTES = [
  { path: '', redirectTo: 'dogs', pathMatch: 'full' },
  { path: 'dogs', component: DogComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    DogService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Update *app.component.html*:

```html
<router-outlet></router-outlet>
```

## Add Styles

Add the following styles to *style.css*:

```css
body {
  color: #333;
  background-color: #eee;
  font-family: “Open Sans”;
}

input, label {
  display: block;
  width: 100%;
}

label {
  font-style: italic;
  margin-bottom: 0.25rem;
}

input {
  margin-bottom: 1rem;
  font-size: 2rem;
  border: none;
}

a {
  text-decoration: none;
  color: #333;
}

header {
  background-color: #4db36f;
  padding: 1rem;
  box-shadow: 0 1px 1px #999;
}
header h1 {
  font-size: 2rem;
  color: #fff;
  font-family: “Indie Flower”;
}

main {
  padding: 3rem;
  position: relative;
  min-height: calc(100vh - 112px);
}
main h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

footer {
  padding: 1rem;
  background-color: #333;
  color: #eee;
}

.dogs {
  display: flex;
  flex-flow: row wrap;
}

.dog-listing {
  max-width: 30rem;
  margin: 1rem;
  box-shadow: 2px 2px 2px #999;
  transition: all 0.2s;
}
.dog-listing:hover {
  transform: scale(1.03);
}
.dog-listing h3 {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  background-color: #6f4db3;
  padding: 1rem;
  color: #eee;
}
.dog-listing figure {
  margin-right: 1rem;
  padding: 1rem;
}
.dog-listing figure img {
  max-width: 160px;
}
.dog-listing figure figcaption {
  font-style: italic;
}
.dog-listing section {
  display: flex;
}
.dog-listing p {
  padding: 1rem;
  line-height: 1.5;
}
```

Update *index.html*:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular4Crud</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <header>
    <h1><a href="/">BarkWire</a></h1>
  </header>
  <main>
    <app-root></app-root>
  </main>
  <footer>
    <small>&copy; Barkwire Inc.</small>
  </footer>
</body>
</html>
```

## Single Dog

`As a lonely dog, I want to be able to link to a specific dog so that I can share my favorite dogs with my friends.`

### Update Service

```javascript
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
```

### Component


Create a new component:

```sh
$ ng g component dog-detail
```

WIP
