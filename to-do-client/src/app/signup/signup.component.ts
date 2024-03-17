import { Component } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup<any>;

  constructor(private signUPService: SignupService, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  signup=async()=>{    
    (await this.signUPService.signUP(this.signupForm.value)).subscribe((data:any)=>{
      if (data.success) {
        alert(`User Sign UP Successfully with userID:${data.userID}`)
      } else {
        alert(`Unable to create User`)
      }
    },(err:any)=>{
      alert(`${err.error.message}`);
    });
  }
}
