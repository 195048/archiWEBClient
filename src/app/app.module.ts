import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // import ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; // import HttpClientModule

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'; // import LoginComponent
import { HomePageComponent } from './components/home-page/home-page.component'; // import HomeComponent

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';


import { AuthService } from './services/auth.service'; // import AuthService
import { MovieService } from './services/movie.service';
import { HeaderComponent } from './components/header/header.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { RateMovieComponent } from './components/rate-movie/rate-movie.component';
import { MyMoviesComponent } from './components/my-movies/my-movies.component';
import { UpdateRatingComponent } from './components/update-rating/update-rating.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlaceholderPageComponent } from './components/placeholder-page/placeholder-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // declare LoginComponent
    HomePageComponent, 
    HeaderComponent, MovieDetailComponent, RegisterComponent, RateMovieComponent, MyMoviesComponent, UpdateRatingComponent, UserDetailsComponent, FooterComponent, PlaceholderPageComponent,  // declare HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // add ReactiveFormsModule to imports array
    HttpClientModule, // add HttpClientModule to imports array
    FormsModule,
  ],
  providers: [
    AuthService, // add AuthService to providers array
    MovieService, // add MovieService to providers array
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppModule { }
