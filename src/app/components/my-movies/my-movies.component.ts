import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {
  myRatings: any[] = [];


  constructor(
    private ratingService: RatingService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.ratingService.getMyRatings().subscribe(
      res => {
        this.myRatings = res;
        console.log(this.myRatings);
      },
      err => {
        console.error(err);
      }
    );
  }

  editRating(movie: any) {
    const email = localStorage.getItem("email");
    this.router.navigate(['/update-rating',email,movie]);
  }
}
