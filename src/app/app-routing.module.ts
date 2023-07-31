import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; // import LoginComponent
import { HomePageComponent } from './components/home-page/home-page.component'; // import HomeComponent
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent }, // add route for LoginComponent
  { path: 'home', component: HomePageComponent }, // add route for HomeComponent
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect to /login by default
  { path: 'movie/:title', component: MovieDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
