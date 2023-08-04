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
  movie: any;
  movieTitle: string = '';
  userRating: any = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private ratingService: RatingService,
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
    const userEmail = localStorage.getItem('email') || '';
    if (userEmail && this.movieTitle) {
      this.ratingService.getRatingByEmailAndTitle(userEmail, this.movieTitle).subscribe(
        response => {
          this.userRating = response;
        },
        error => {
          console.log("No rating found for this movie from this user");
        }
      );
    }
  }

  updateRating(): void {
    const userEmail = localStorage.getItem('email') || '';
    if (userEmail && this.movieTitle) {
      this.router.navigate([`/update-rating/${userEmail}/${this.movieTitle}`]);
    }
  }
}
