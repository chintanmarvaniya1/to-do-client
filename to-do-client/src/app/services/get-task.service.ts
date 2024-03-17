import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GetTaskService {

  constructor(private http : HttpClient, private cookieService:CookieService) {
  }

  getTask=async (token:String)=>{
    let headers = new HttpHeaders().set("Authorization",`bearer ${token}`)
    return this.http.get("https://to-do-server-hkme.onrender.com/api/task/getalltask",{headers});
  }
}