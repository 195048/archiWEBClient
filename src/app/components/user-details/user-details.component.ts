import { Component, OnInit } from '@angular/core';
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

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
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
    this.showPasswordModal = true;
  }

  closePasswordModal() {
    this.showPasswordModal = false;
  }

  openAddressModal() {
    this.showAddressModal = true;
  }

  closeAddressModal() {
    this.showAddressModal = false;
  }

  onPasswordSubmit() {
    if (this.passwordForm.valid && this.passwordForm.value.newPassword === this.passwordForm.value.confirmPassword) {
      this.userService.verifyPassword(this.user.email, this.passwordForm.value.oldPassword).subscribe(isValid => {
        if (isValid) {
          this.user.password = this.passwordForm.value.newPassword;
          this.userService.updateUser(this.user).subscribe(response => {
            const updatedUser = response.user; // Extract the 'user' property from the response
            this.user = updatedUser;
            this.closePasswordModal();
          });
        }
      });
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
