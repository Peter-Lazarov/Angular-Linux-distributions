import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailDirective } from 'src/app/user/validators/email.directive';
import { passwordsCompare } from 'src/app/user/validators/passwords';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {

  }

  emailDirectiveInstance = new EmailDirective();

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.minLength(8), this.emailDirectiveInstance.emailValidator()]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        rePassword: ['', [Validators.required, Validators.minLength(4)]]
      }, 
      {
        validators: [passwordsCompare('password', 'rePassword')]
      },
    )
  });

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { email, passwordGroup: { password, rePassword } = {}, name } = this.registerForm.value;

    this.userService.register(email!, password!, rePassword!, name!).subscribe(() => {
      this.router.navigate(['/user/login'])
    });

    //console.log(this.registerForm.value);
  }
}
