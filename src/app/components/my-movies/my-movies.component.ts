import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {
  myRatings: any[] = [];


  constructor(private ratingService: RatingService) { }

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
}
