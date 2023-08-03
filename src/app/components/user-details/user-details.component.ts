// user-details.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User = { email: '', password: '', address: '', picture: '' };
  newPassword = '';
  oldPassword = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const id = localStorage.getItem('userId');  // Retrieve the ID from localStorage
    if (id) {
      this.userService.getUserById(id).subscribe((data: User) => {
        this.user = data;
      });
    }
  }

  onUpdate(): void {
    if (this.oldPassword && this.newPassword) {
      this.userService.verifyPassword(this.user.email, this.oldPassword).subscribe(isMatch => {
        if (isMatch) {
          this.user.password = this.newPassword;
          this.userService.updateUser(this.user).subscribe(() => {
            console.log('User updated successfully');
          });
        } else {
          console.log('Incorrect old password');
        }
      });
    }
  }
}
