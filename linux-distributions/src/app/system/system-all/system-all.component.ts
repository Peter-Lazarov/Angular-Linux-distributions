import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { SystemService } from '../system.service';
import { OperatingSystem } from 'src/app/types/operating-system';

@Component({
  selector: 'app-system-all',
  templateUrl: './system-all.component.html',
  styleUrls: ['./system-all.component.css']
})
export class SystemAllComponent implements OnInit{
  systemsAll: OperatingSystem[] = [];
  systemsCount: number = 0;
  isUserLogged = false;

  constructor(private userService: UserService, private systemService: SystemService){
    
  }

  ngOnInit(): void {
    this.systemService.getSystemAll().subscribe((system) => {
      this.systemsAll = system;
      this.systemsCount = system.length;
      //console.log(this.systemsAll);      
      this.isUserLogged = this.userService.isLogged;  
    });
  }

  // get userId(): string {
  //   return this.userService.user?.id || '';
  // }

  // isSubscribed(theme: Theme) {
  //   const isSubscribedUser = theme.subscribers.find((s) => { 
  //     return s === this.userService.user?.id || '' 
  //   });
  //   //console.log(theme.subscribers);
  //   //console.log(!!isSubscribedUser);

  //   return !!isSubscribedUser;
  // }

  
}
