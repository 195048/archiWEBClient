import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // import ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; // import HttpClientModule

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'; // import LoginComponent
import { HomePageComponent } from './components/home-page/home-page.component'; // import HomeComponent

import { AppRoutingModule } from './app-routing.module';


import { AuthService } from './services/auth.service'; // import AuthService
import { MovieService } from './services/movie.service';
import { HeaderComponent } from './components/header/header.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { RateMovieComponent } from './components/rate-movie/rate-movie.component';
import { MyMoviesComponent } from './components/my-movies/my-movies.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // declare LoginComponent
    HomePageComponent, 
    HeaderComponent, MovieDetailComponent, RegisterComponent, RateMovieComponent, MyMoviesComponent,  // declare HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // add ReactiveFormsModule to imports array
    HttpClientModule, // add HttpClientModule to imports array
  ],
  providers: [
    AuthService, // add AuthService to providers array
    MovieService, // add MovieService to providers array
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
