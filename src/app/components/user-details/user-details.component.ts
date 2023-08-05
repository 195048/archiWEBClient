import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User = {} as User;  // Initialize as an empty User object
  showPasswordModal: boolean = false;
  showAddressModal: boolean = false;
  passwordForm: FormGroup;
  addressForm: FormGroup;
  passwordError: string | null = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService,private cdr: ChangeDetectorRef) {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(1)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.addressForm = this.formBuilder.group({
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const email:string = localStorage.getItem('email') || '';  // Handle potential null value
    if (email) {
      this.userService.getUserById(email).subscribe(user => this.user = user);
    }
  }

  openPasswordModal() {
    this.passwordForm.reset();
    this.passwordError = null;
    this.showPasswordModal = true;
  }

  closePasswordModal() {
    this.showPasswordModal = false;
  }

  openAddressModal() {
    this.addressForm.reset();
    this.showAddressModal = true;
  }

  closeAddressModal() {
    this.showAddressModal = false;
  }

  onPasswordSubmit() {
    console.log(this.passwordForm.valid && this.passwordForm.value.newPassword === this.passwordForm.value.confirmPassword);  // Add this line
    if (this.passwordForm.valid && this.passwordForm.value.newPassword === this.passwordForm.value.confirmPassword) {
      this.userService.verifyPassword(this.user.email, this.passwordForm.value.oldPassword).subscribe(
        isValid => {
          if (isValid) {
            this.user.password = this.passwordForm.value.newPassword;
            this.userService.updateUser(this.user).subscribe(response => {
              const updatedUser = response.user; // Extract the 'user' property from the response
              this.user = updatedUser;
              this.closePasswordModal();
            });
          } else {
            this.passwordError = 'Incorrect old password. Please try again.';
          }
        },
        error => {
          // The server returned an error.
          console.error('An error occurred:', error);
          this.passwordError = 'Wrong old password.';
        }
      );
  }
}

  onAddressSubmit() {
    if (this.addressForm.valid) {
      this.user.address = this.addressForm.value.address;
      this.userService.updateUser(this.user).subscribe(response => {
        const updatedUser = response.user; // Extract the 'user' property from the response
        console.log(updatedUser);
        this.user = updatedUser;
        this.closeAddressModal();
      });
    }
  }
}
