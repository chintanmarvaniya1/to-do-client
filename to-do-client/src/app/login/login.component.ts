import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginForm! :FormGroup<any>

  constructor(private router: Router,private loginService:LoginService,private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ngOnInit() {
    localStorage.setItem("token","")
  }

  login=async()=>{
    console.log(this.loginForm.value);
    (await this.loginService.logIn(this.loginForm.value)).subscribe((success:any)=>{
      console.log(success);
      localStorage.setItem("token",success.result.token)
      this.router.navigate(['/home']);  
    },
    (error:any)=>{
      if (error.status==404) {
        localStorage.setItem("token","")
        alert(error.error.message)
      }else if (error.status==403) {
        localStorage.setItem("token","")
        alert(error.error.message)
      }else if (error.status==503) {
        localStorage.setItem("token","")
        alert(error.error.message)
        this.router.navigate(['/']);  
      }else{
        localStorage.setItem("token","")
        alert(error.error.message)
      }
    })
  }
}
