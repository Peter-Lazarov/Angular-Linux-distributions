import { Component } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-environment-add',
  templateUrl: './environment-add.component.html',
  styleUrls: ['./environment-add.component.css']
})
export class EnvironmentAddComponent {
  constructor(private environmentService: EnvironmentService, private router: Router){

  }

  addEnvironment(environmentAddForm: NgForm){
    if (environmentAddForm.invalid) {
      return;
    }

    const { name, description, image} = environmentAddForm.value;
    
    this.environmentService.writeEnvironment(name, description, image).subscribe(() => {
      this.router.navigate(['/environment']);
    });
  }
}
