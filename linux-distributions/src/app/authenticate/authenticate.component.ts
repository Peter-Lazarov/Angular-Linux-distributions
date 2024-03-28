import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit{
  isAuthenticating = true;
  
  constructor(private userService: UserService, private cookieService: CookieService){

  }

  ngOnInit(): void {
    //setTimeout(() => {
      //console.log(this.cookieService.check("authorisation"));
      
      if(this.cookieService.check('authorisation')){
        this.userService.getProfile().subscribe({
          next: () => {
            this.isAuthenticating = false;
          },
          error: () => {
            this.isAuthenticating = false;
          },
          complete: () => {
            this.isAuthenticating = false;
          },
        })
      }else{
        this.isAuthenticating = false;
      }
    //}, 3000);
  }

}
