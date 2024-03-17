import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteTaskService {

  constructor(private http : HttpClient) { }

  deleteTask=async (id:any,token:String)=>{
    let headers = new HttpHeaders().set("Authorization",`bearer ${token}`)
    return this.http.delete("https://to-do-server-hkme.onrender.com/api/task/deletetask/"+id,{headers})
  }
}
