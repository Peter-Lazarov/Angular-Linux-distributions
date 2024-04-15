import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService, private cookieService: CookieService) {

  }
  
  async ngOnInit(): Promise<void> {
    //setTimeout(() => {
    //console.log(this.cookieService.check("authorisation"));
    if (this.cookieService.check('authorisation')) {
      try {
        await this.userService.getProfile().toPromise();
        //console.log("Next AuthenticateComponent " + this.userService.isLogged);
        this.isAuthenticating = false;
      } catch (error) {
        //console.log("Error AuthenticateComponent " + this.userService.isLogged);
        this.isAuthenticating = false;
      } finally {
        //console.log("Complete AuthenticateComponent " + this.userService.isLogged);
        this.isAuthenticating = false;
      }
    } else {
      this.isAuthenticating = false;
    }
    //}, 3000);
  }
}
