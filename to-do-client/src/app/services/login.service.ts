import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) {
  }

  logIn=async (data:any)=>{
    return this.http.post("https://to-do-server-hkme.onrender.com/api/user/login",data)
  }
}
