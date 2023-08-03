// update-rating.component.ts
import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


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

  constructor(private ratingService: RatingService, private router: Router, private route: ActivatedRoute,private location: Location) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.title = this.route.snapshot.paramMap.get('title');
    if (this.email && this.title) {
      this.ratingService.getRatingByEmailAndTitle(this.email, this.title).subscribe(response => {
        this.score = response.score;
        this.review = response.review;
      });
    }
  }

  ratingChanged(event: any): void {
    console.log(event.detail);
    this.score = event.detail;
  }
  

  onSubmit(): void {
    console.log(this.email);
    console.log(this.title);
    console.log(this.score);
    console.log(this.review);
    
    if (this.email && this.title && this.score && this.review) {
      this.ratingService.updateRatingByEmailAndTitle(this.email, this.title, this.score, this.review).subscribe(() => {
        this.location.back();
      });
    }
  }
  
}
