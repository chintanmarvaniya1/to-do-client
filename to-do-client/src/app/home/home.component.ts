import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetTaskService } from '../services/get-task.service';
import { AddTaskService } from '../services/add-task.service';
import { DeleteTaskService } from '../services/delete-task.service';
import { UpdateTaskService } from '../services/update-task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  token :any
  taskList: any[] | undefined
  todoList:any[] | undefined
  completedList:any[] | undefined
  TaskInputForm! : FormGroup<any>
  
  constructor(private router: Router,private getTaskService:GetTaskService,private addTaskService :AddTaskService ,private updateTaskService:UpdateTaskService, private deleteTaskService:DeleteTaskService,private fb: FormBuilder){
    this.TaskInputForm = this.fb.group({
      taskname: ['',Validators.required]
    });
  }

  ngOnInit() {
    this.token = localStorage.getItem("token")
    this.getAllUserTask()
  }

  addUserTAsk=async () => {
    (await this.addTaskService.addTask(this.TaskInputForm.value,this.token)).subscribe((success:any)=>{
      if (success.success) {
        this.getAllUserTask();
      } else {
        alert(`Unable to create Task`)
      }
    },
    (error:any)=>{
      alert(`${error.error.message}`);
    })
  }

  getAllUserTask=async()=>{
    (await this.getTaskService.getTask(this.token)).subscribe((success:any)=>{
       this.taskList = success.taskList;
       this.todoList = this.taskList?.filter(function(obj) {return !obj.isCompleted})
       this.completedList = this.taskList?.filter(function(obj) {return obj.isCompleted})
    },
    (error)=>{
      if (error.status==404) {
        alert(error.error.message)
      }else if (error.status==403) {
        alert(error.error.message)
      }else{
        alert(error.error.message)
      }
    })
  }

  updateTask=async(taskID:any) => {
    (await this.updateTaskService.updateTask(taskID,this.token)).subscribe((success:any )=>{
      if (success.success) {
        this.getAllUserTask();
      } else {
        alert(`Unable to Update Task`)
      }
      
    },(error)=>{
      alert(`${error.error.message}`);
    })
  }

  deleteTask=async(taskID:any)=>{
    console.log(taskID);
    (await this.deleteTaskService.deleteTask(taskID,this.token)).subscribe((success:any )=>{
      console.log(success);
      if (success.success) {
        this.getAllUserTask();
      } else {
        alert(`Unable to Delete Task`)
      }
      
    },(error)=>{
      alert(`${error.error.message}`);
    })
  }
}