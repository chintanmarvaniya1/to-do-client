import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http : HttpClient) {
   }

   signUP=async (data:any) => {
      return this.http.post("https://to-do-server-hkme.onrender.com/api/user/signup",data);
   }
}
