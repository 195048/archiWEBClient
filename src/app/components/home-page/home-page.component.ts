import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  movies: any[] = [];
  searchTerm: string = '';

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovies().subscribe((data: any[]) => {
      console.log(data);
      this.movies = data;
    })
  }

  get filteredMovies(): any[] {
    if (!this.searchTerm) {
      return this.movies;
    }

    return this.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
