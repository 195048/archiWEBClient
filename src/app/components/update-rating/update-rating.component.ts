import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-rating',
  templateUrl: './update-rating.component.html',
  styleUrls: ['./update-rating.component.css']
})
export class UpdateRatingComponent implements OnInit {
  score: number | null = null;
  review: string | null = null;
  email: string | null = null;
  title: string | null = null;
  ratingId: string | null = null;

  constructor(private ratingService: RatingService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.title = this.route.snapshot.paramMap.get('title');
    if (this.email && this.title) {
      this.ratingService.getRatingByEmailAndTitle(this.email, this.title).subscribe(response => {
        this.score = response.score;
        this.review = response.review;
        this.ratingId = response.rating_id;
      });
    }
  }

  ratingChanged(event: any): void {
    this.score = event.detail;
  }
  
  updateRating(): void {
    if (this.email && this.title && this.score && this.review) {
      this.ratingService.updateRatingByEmailAndTitle(this.email, this.title, this.score, this.review).subscribe(() => {
        this.router.navigate(['/my-movies']);
      });
    }
  }

  deleteRating(): void {
    if (this.ratingId) {
      this.ratingService.deleteRating(this.ratingId).subscribe(() => {
        this.router.navigate(['/my-movies']);
      });
    }
  }
}
