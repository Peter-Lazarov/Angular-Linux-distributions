import { Component, OnInit } from '@angular/core';
import { OperatingSystemAsString, OperatingSystemWithCommentariesAndPublisher } from 'src/app/types/operating-system';
import { SystemService } from '../system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DistributionService } from 'src/app/distribution/distribution.service';
import { EnvironmentService } from 'src/app/environment/environment.service';
import { DesktopEnvironment } from 'src/app/types/desktop-environment';
import { Distribution } from 'src/app/types/distribution';
import { UserService } from 'src/app/user/user.service';
import { Commentary, CommentaryForShow } from 'src/app/types/commentary';

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
  isLogged: boolean = false;

  commentar = {} as Commentary;
  userId: string | undefined = '';

  formDetails = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    environment: [''],
    distribution: [''],
  });

  commentaryForm = this.formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(5)]],
    userId: ['']
  });

  environmentsAll: DesktopEnvironment[] = [];
  distributionsAll: Distribution[] = [];
  environmentId: string = '';

  commentaryAll: CommentaryForShow[] = [];

  constructor(private userService: UserService, private systemService: SystemService, private activeRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private environmentService: EnvironmentService, private distributionService: DistributionService, private router: Router
  ) {

  }

  loadSystem() {
    this.activeRoute.params.subscribe((data) => {
      const systemId = data['id'];
      //console.log('systemId ' + systemId);
      
 

      this.systemService.getSystemOne(systemId).subscribe((system) => {
        this.systemDetails = system;
        
        this.isLoading = false;
      })
      
      this.systemService.getCommentaryAll(systemId).subscribe((commentary) => {
        this.commentaryAll = commentary;
      });
  

    });
  }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.isLogged = !!user;
      this.userId = user?._id;
    });
    this.loadSystem();
  }

  loadForm() {
    if (this.isLogged) {
      this.formDetails.setValue({
        name: this.systemDetails.name,
        environment: this.systemDetails.environment._id,
        distribution: this.systemDetails.distribution._id,
      });
      //this.showEditMode = true;
    }
  }

  saveDetails(systemId: string) {
    if (this.isLogged) {
      if (!this.formDetails.valid) {
        return;
      }

      this.formObject = this.formDetails.value as OperatingSystemAsString;
      const { name, environment, distribution } = this.formObject;

      this.systemService.update(systemId, name, environment, distribution).subscribe(() => {
        //this.onToggle();
      });
      this.loadSystem();
      this.showEditMode = !this.showEditMode;
    }
  }

  onToggle(): void {
    if (this.isLogged) {
      this.formDetails = this.formBuilder.group({
        name: [''],
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
  }

  onCancel(e: Event) {
    e.preventDefault();
    this.onToggle();
  }

  addComment(systemId: string, userId: string | undefined) {
    if (this.isLogged) {
      //console.log('in commentar ' + JSON.stringify(this.systemDetails));

      if (!this.commentaryForm.valid) {
        return;
      }

      this.commentar = this.commentaryForm.value as Commentary;
      const { content } = this.commentar;
      this.commentaryForm.reset();

      this.systemService.addCommentary(content, systemId, userId).subscribe(() => {
        //this.onToggle();
        this.loadSystem();
      });
    }
  }

  deleteCurrentSystem(systemId: string) {
    if (this.isLogged) {
      this.systemService.deleteSystem(systemId).subscribe(() => {
        this.router.navigate(['/system']);
      });
    }
  }
}
