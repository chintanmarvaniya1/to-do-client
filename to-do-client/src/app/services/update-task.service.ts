import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateTaskService {

  constructor(private http : HttpClient) { }

  updateTask=async (id:any,token:String)=>{
    let headers = new HttpHeaders().set("Authorization",`bearer ${token}`)
    return this.http.put("https://to-do-server-hkme.onrender.com/api/task/updatetask/"+id,{},{headers})
  }
}