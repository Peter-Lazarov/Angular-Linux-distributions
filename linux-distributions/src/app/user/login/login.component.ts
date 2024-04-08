import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {

  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/system']);
      },
      error: (receivedError) => {
        this.errorMessage = receivedError
        //console.error(receivedError);
      }
    });
  }

}
