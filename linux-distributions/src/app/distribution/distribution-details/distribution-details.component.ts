import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Distribution } from 'src/app/types/distribution';
import { DistributionService } from '../distribution.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-distribution-details',
  templateUrl: './distribution-details.component.html',
  styleUrls: ['./distribution-details.component.css']
})
export class DistributionDetailsComponent {
  distributionDetails = {} as Distribution;
  isLoading: boolean = true;
  userName: string = '';

  constructor(private activeRoute: ActivatedRoute, private distributionService: DistributionService,
      private userService: UserService) {

  }

  loaddistribution(){
    this.activeRoute.params.subscribe((data) => {
      const distributionId = data['id'];
      this.distributionService.getDitributionOne(distributionId).subscribe((distribution) => {
        this.distributionDetails = distribution;
        this.userService.getUserName(distribution.publisher).subscribe((userName) => {
          this.userName = userName;
          this.isLoading = false;
        });
      })

     
    });
  }

  ngOnInit() {
    this.loaddistribution();
  }

}
