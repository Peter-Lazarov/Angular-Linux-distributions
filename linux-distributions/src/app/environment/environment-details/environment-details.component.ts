import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvironmentService } from 'src/app/environment/environment.service';
import { DesktopEnvironment } from 'src/app/types/desktop-environment';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-environment-details',
  templateUrl: './environment-details.component.html',
  styleUrls: ['./environment-details.component.css']
})
export class EnvironmentDetailsComponent {
  environmentDetails = {} as DesktopEnvironment;
  isLoading: boolean = true;
  userName: string = '';

  constructor(private activeRoute: ActivatedRoute, private environmentService: EnvironmentService,
    private userService: UserService) {

  }

  loadEnvironment(){
    this.activeRoute.params.subscribe((data) => {
      const environmentId = data['id'];
     
      this.environmentService.getEnvironmentOne(environmentId).subscribe((environment) => {
        
        this.environmentDetails = environment;
        this.userService.getUserName(environment.publisher).subscribe((userName) => {
          this.userName = userName;
          this.isLoading = false;
        });
      })
    });
  }

  ngOnInit() {
    this.loadEnvironment();
  }
}
