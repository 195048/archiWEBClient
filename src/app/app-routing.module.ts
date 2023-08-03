import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; // import LoginComponent
import { HomePageComponent } from './components/home-page/home-page.component'; // import HomeComponent
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { RateMovieComponent } from './components/rate-movie/rate-movie.component';
import { MyMoviesComponent } from './components/my-movies/my-movies.component'; // Assurez-vous d'importer le composant
import { UpdateRatingComponent } from './components/update-rating/update-rating.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent }, // add route for LoginComponent
  { path: 'home', component: HomePageComponent }, // add route for HomeComponent
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect to /login by default
  { path: 'movie/:title', component: MovieDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rate-movie/:title', component: RateMovieComponent },
  { path: 'my-movies', component: MyMoviesComponent },  // Ajoutez cette ligne pour la nouvelle route
  { path: 'update-rating/:email/:title', component: UpdateRatingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
