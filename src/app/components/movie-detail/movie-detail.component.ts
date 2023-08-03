import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import {RatingService} from '../../services/rating.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;  // Change this to the type of your movie object, if you have one.
  movieTitle: string = '';  // Initialize the variable.
  userRating: any = null;  // Initialize the variable.

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private ratingService: RatingService,  // inject the rating service
    private router: Router
  ) { }
  

  ngOnInit() {
    this.movieTitle = this.route.snapshot.paramMap.get('title') || '';
    this.getMovie();
    this.getUserRating();
  }

  getMovie(): void {
    this.movieService.getMovie(this.movieTitle).subscribe(movie => this.movie = movie);
  }

  getUserRating(): void {
    const userEmail = localStorage.getItem('email') || '';  // Handle potential null value.
    if (userEmail && this.movieTitle) {  // Only run the request if we have the necessary data.
      this.ratingService.getRatingByEmailAndTitle(userEmail, this.movieTitle).subscribe(response => {
        this.userRating = response;
      });
    }
  }

  updateRating(): void {
    const userEmail = localStorage.getItem('email') || '';
    if (userEmail && this.movieTitle) {
      this.router.navigate([`/update-rating/${userEmail}/${this.movieTitle}`]);
    }
  }
  
}

  
