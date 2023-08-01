import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-rate-movie',
  templateUrl: './rate-movie.component.html',
  styleUrls: ['./rate-movie.component.css']
})
export class RateMovieComponent implements OnInit {
  rateMovieForm: FormGroup;
  movieTitle!: string; // I've also renamed movieId to movieTitle to avoid confusion

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private ratingService : RatingService
  ) {
    this.rateMovieForm = this.formBuilder.group({
      score: ['', Validators.required],
      review: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.movieTitle = this.route.snapshot.paramMap.get('title') || '';
  }

  onSubmit(): void {
    if (this.rateMovieForm.valid) {
      this.ratingService.rateMovie(this.movieTitle, this.rateMovieForm.value).subscribe(
        res => {
          this.router.navigate(['/home']);
        },
        err => {
          console.error(err);
        }
      );
    }
  }
}
