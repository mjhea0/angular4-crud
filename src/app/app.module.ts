import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { DogService } from './dog.service';
import { DogComponent } from './dog/dog.component';
import { DogDetailComponent } from './dog-detail/dog-detail.component';

const ROUTES = [
  { path: 'dogs', component: DogComponent },
  { path: 'dogs-detail/:id', component: DogDetailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DogComponent,
    DogDetailComponent
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
