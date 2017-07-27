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
