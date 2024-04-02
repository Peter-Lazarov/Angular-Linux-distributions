import { Component, OnInit } from '@angular/core';
import { OperatingSystemAsString, OperatingSystemWithCommentariesAndPublisher } from 'src/app/types/operating-system';
import { SystemService } from '../system.service';
import { ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DistributionService } from 'src/app/distribution/distribution.service';
import { EnvironmentService } from 'src/app/environment/environment.service';
import { DesktopEnvironment } from 'src/app/types/desktop-environment';
import { Distribution } from 'src/app/types/distribution';

@Component({
  selector: 'app-system-details',
  templateUrl: './system-details.component.html',
  styleUrls: ['./system-details.component.css']
})
export class SystemDetailsComponent implements OnInit {
  systemDetails = {} as OperatingSystemWithCommentariesAndPublisher;
  formObject = {} as OperatingSystemAsString;
  isLoading: boolean = true;
  showEditMode: boolean = false;

  formDetails = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    environment: [''],
    distribution: [''],
  });

  environmentsAll: DesktopEnvironment[] = [];
  distributionsAll: Distribution[] = [];
  environmentId: string = '';

  constructor(private systemService: SystemService, private activeRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private environmentService: EnvironmentService, private distributionService: DistributionService) {

  }

  ngOnInit() {
    this.loadSystem();
  }

  loadSystem(){
    this.activeRoute.params.subscribe((data) => {
      const systemId = data['id'];
      //console.log('systemId ' + systemId);

      this.systemService.getSystemOne(systemId).subscribe((system) => {
        this.systemDetails = system;
        this.isLoading = false;
        
        //console.log(this.systemDetails);
        //console.log(this.systemDetails.isPublisher);
      })
    });
  }

  loadForm() {
    this.formDetails.setValue({
      name: this.systemDetails.name,
      environment: this.systemDetails.environment._id,
      distribution: this.systemDetails.distribution._id,
    });
    //this.showEditMode = true;
  }

  saveDetails(systemId: string) {
    if (this.formDetails.valid) {
      const formValues = this.formDetails.value;
      // save formValues to your backend
      this.showEditMode = false;
    }

    this.formObject = this.formDetails.value as OperatingSystemAsString;
    const { name, environment, distribution } = this.formObject;

    this.systemService.update(systemId, name, environment, distribution).subscribe(() => {     
      //this.onToggle();
    });
    this.loadSystem();
  }

  onToggle(): void {
    this.formDetails = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      environment: [''],
      distribution: ['']
    });

    this.environmentService.getEnvironmentAll().subscribe((environments) => {
      this.environmentsAll = environments;
    });

    this.distributionService.getDistributionAll().subscribe((distribution) => {
      this.distributionsAll = distribution;
    });

    this.loadForm();

    this.showEditMode = !this.showEditMode;
  }

  onCancel(e: Event) {
    e.preventDefault();
    this.onToggle();
  }

}
