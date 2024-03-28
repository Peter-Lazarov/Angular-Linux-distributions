import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DistributionService } from '../distribution.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distribution-add',
  templateUrl: './distribution-add.component.html',
  styleUrls: ['./distribution-add.component.css']
})
export class DistributionAddComponent {
  constructor(private distributionService: DistributionService, private router: Router){

  }

  addDistribution(distributionAddForm: NgForm){
    if (distributionAddForm.invalid) {
      return;
    }

    const { name, description, image} = distributionAddForm.value;
    
    this.distributionService.writeDistribution(name, description, image).subscribe(() => {
      this.router.navigate(['/distribution']);
    });
  }
}
