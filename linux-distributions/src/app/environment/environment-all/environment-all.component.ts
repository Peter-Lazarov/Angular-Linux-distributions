import { Component, OnInit } from '@angular/core';
import { DesktopEnvironment } from 'src/app/types/desktop-environment';
import { UserService } from 'src/app/user/user.service';
import { EnvironmentService } from '../environment.service';

@Component({
  selector: 'app-environment-all',
  templateUrl: './environment-all.component.html',
  styleUrls: ['./environment-all.component.css']
})
export class EnvironmentAllComponent implements OnInit {
  environmentsAll: DesktopEnvironment[] = [];

  constructor(private userService: UserService, private environmentService: EnvironmentService) { 
    
  }

  ngOnInit(): void {
    this.environmentService.getEnvironmentAll().subscribe((environment) => {
      this.environmentsAll = environment;
    });
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.userObject?._id || '';
  }
}
