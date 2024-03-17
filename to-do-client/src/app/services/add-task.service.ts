import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor(private http : HttpClient) { }

  addTask=async (data:any,token:String)=>{
    let headers = new HttpHeaders().set("Authorization",`bearer ${token}`)
    return this.http.post("https://to-do-server-hkme.onrender.com/api/task/addtask",data,{headers})
  }
}