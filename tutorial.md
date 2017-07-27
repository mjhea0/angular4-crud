# Angular4Crud Tutorial

Just the "C" in CRUD...

## User Story

`As a lonely dog, I want to see a list of all of the dogs that are available so that I can see my dating options.`

## Angular 4?

1. Version History:
    - Angular JS (or Angular 1.x)
    - Angular 2 (complete re-write for components)
    - Angular 4 (backwards compatible with Angular 2)
1. TypeScript: static types, developed by Microsoft, [superset](https://en.wikipedia.org/wiki/Superset) of JS
1. Building blocks: components, services, directives, events
1. Framework: Bigger, more bloated than React or Vue

## Setup with the Angular CLI

Create new project:

```sh
$ npm install @angular/cli -g
$ ng new APP_NAME && cd APP_NAME
```

> `@` symbol? These are [scoped](https://docs.npmjs.com/misc/scope) modules. They are used for [grouping](https://stackoverflow.com/questions/36667258/understanding-npm-package-prefix-angular-router) similar packages.

Why use the [CLI](https://cli.angular.io/)?

Zero-config boilerplate that works out of the box. You do not need to configure webpack or the Typescript compiler to build an app. It provides a nice structure along with linting and testing. It provides sane, helpful errors. Review the *package.json* as well as the *.angular-cli.json* for more info.

Sanity check:

```sh
$ ng serve
```

> The CLI initializes a new Git repo!

## All Dogs

`As a lonely dog, I want to see a list of all of the dogs that are available so that I can see my dating options.`

### Define Service

Services are used to encapsulate common functionality for reuse across components. Perfect for storing AJAX requests. *Skinny components, fat services!*

Create a new service:

```sh
$ ng g service services/dog
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

export class AppModule {}
```

So, the `AppModule` is used to [bootstrap](https://angular.io/guide/bootstrapping) the Angular app. The `@NgModule` decorator takes metadata that lets Angular know how to run the app. Everything that we create will be added to this object.

Update the service itself:

```javascript
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
```

Here, we defined a class called `DogService`, which takes the `Http` module, and then we created a method called `getAllDogs`, which makes an AJAX request to the Node app and returns an [observeable](https://medium.com/google-developer-experts/angular-introduction-to-reactive-extensions-rxjs-a86a7430a61f) sequence. The `@Injectable()` decorator turns this class into a dependency that we can inject into a component...

### Create Component

Create a new component:

```sh
$ ng g component components/dog
```

This sets up the component files and folders and even adds it to *app.module.ts*! Update the component itself:

```javascript
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

  dogs: any; // why "any"? lazy

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
```

Update *dog.component.html*:

```html
<ul>
  <li *ngFor="let dog of dogs" class="dogs">
    {{ dog.name }}
  </li>
</ul>
```

This uses the `ngFor` [microsyntax](https://angular.io/guide/template-syntax#ngfor-microsyntax), which is some nice sugar so we don't have to use an [ng-template](https://angular.io/guide/structural-directives#inside-ngfor)

### Configure Routing

To link a component to a specific route we need to configure the Angular [router](https://angular.io/guide/router)...

Update *app.module.ts*:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { DogService } from './services/dog.service';
import { DogComponent } from './components/dog/dog.component';

const appRoutes: Routes = [
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
    RouterModule.forRoot(appRoutes)
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

## Sanity Check

Run `ng serve`. Fix any errors. Test it out in the browser.

## Add Some Style

Add the following styles to *style.css*:

```css
@import url("http://meyerweb.com/eric/tools/css/reset/reset.css");
@import url("https://fonts.googleapis.com/css?family=Indie+Flower%7COpen+Sans");

body {
  color: #333;
  background-color: #eee;
  font-family: "Open Sans";
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
  font-family: "Indie Flower";
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
  <title>BarkWire</title>
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

Update *dog-component.html*:

```html
<ul class="dogs">
  <li *ngFor="let dog of dogs" class="dogs">
    <section class="dog-listing">
      <h3 class="name">{{dog.name}}</h3>
      <section>
        <figure>
          <img src="{{dog.imageUrl}}" alt="{{dog.name}}" />
          <figcaption>{{dog.imageCaption}}</figcaption>
        </figure>
        <p>{{dog.description}}</p>
      </section>
    </section>
  </li>
</ul>
```
