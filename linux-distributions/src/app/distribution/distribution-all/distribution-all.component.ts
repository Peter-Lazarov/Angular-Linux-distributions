import { Component, OnInit } from '@angular/core';
import { Distribution } from 'src/app/types/distribution';
import { DistributionService } from '../distribution.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-distribution-all',
  templateUrl: './distribution-all.component.html',
  styleUrls: ['./distribution-all.component.css']
})
export class DistributionAllComponent implements OnInit {
  distributionsAll: Distribution[] = [];

  constructor(private userService: UserService, private distributionService: DistributionService) { 
    
  }

  ngOnInit(): void {
    this.distributionService.getDistributionAll().subscribe((distribution) => {
      this.distributionsAll = distribution;
    });
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.user?._id || '';
  }
}
