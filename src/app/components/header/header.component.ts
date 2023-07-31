  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { AuthService } from '../../services/auth.service';
  import { Subscription } from 'rxjs';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  })
  export class HeaderComponent implements OnInit, OnDestroy {

    public isAuthenticated: boolean = true;
    private authSubscription?: Subscription;
    

    constructor(public authService: AuthService,
      private router: Router
      ) { }

    ngOnInit(): void {
      // Subscribe to the authState Observable
      this.authSubscription = this.authService.isAuthenticated().subscribe(
        isAuthenticated => this.isAuthenticated = isAuthenticated
      );
    }

    ngOnDestroy(): void {
      // Unsubscribe when the component is destroyed to avoid memory leaks
      if(this.authSubscription) {
        this.authSubscription.unsubscribe();
      }
    }

    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
