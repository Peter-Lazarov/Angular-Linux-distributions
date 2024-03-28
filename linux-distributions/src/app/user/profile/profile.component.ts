import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    const {email, name} = this.userService.user!;
  }
}
