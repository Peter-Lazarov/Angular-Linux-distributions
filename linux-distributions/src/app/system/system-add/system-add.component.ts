import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DesktopEnvironment } from 'src/app/types/desktop-environment';
import { EnvironmentService } from 'src/app/environment/environment.service';
import { DistributionService } from 'src/app/distribution/distribution.service';
import { Distribution } from 'src/app/types/distribution';

@Component({
  selector: 'app-system-add',
  templateUrl: './system-add.component.html',
  styleUrls: ['./system-add.component.css']
})
export class SystemAddComponent implements OnInit {

  environmentsAll: DesktopEnvironment[] = [];
  distributionsAll: Distribution[] = [];

  constructor(private systemService: SystemService, private router: Router,
    private environmentService: EnvironmentService, private distributionService: DistributionService) {

  }

  ngOnInit(): void {
    this.environmentService.getEnvironmentAll().subscribe((environments) => {
      this.environmentsAll = environments;
    });

    this.distributionService.getDistributionAll().subscribe((distribution) => {
      this.distributionsAll = distribution;
    });
  }

  addSystem(systemAddForm: NgForm) {
    if (systemAddForm.invalid) {
      return;
    }

    const { name, desktopEnvironment } = systemAddForm.value;
    console.log({ name, desktopEnvironment });

    // this.systemService.createSystem(name, desktopEnvironment).subscribe(() => {
    //   this.router.navigate(['/system']);
    // });

  }
}
