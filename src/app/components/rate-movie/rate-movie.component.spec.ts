import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateMovieComponent } from './rate-movie.component';

describe('RateMovieComponent', () => {
  let component: RateMovieComponent;
  let fixture: ComponentFixture<RateMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateMovieComponent]
    });
    fixture = TestBed.createComponent(RateMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
