import { Component } from '@angular/core';
import { Item } from './shared/models/item';
import { TodoService } from './core/service/todo.service';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private TodoService:TodoService, public location:Location){

  }
  refreshPage() {
    this.location.back();
    }

  title = 'todo';
  public allItem: any = []
  currentDate: Date = new Date();

  taskTitle = ""
  addTitle(title: string): void{
    this.taskTitle = title
  }
  //ToDo: Eliminar esta lista al momento de integrar la API
  filter: "all" | "active" | "todo" = "all"
ngOnInit():void{
  this.loadData();
}
  public loadData(){
    this.TodoService.getTask('https://todolist-vp6o.onrender.com/todo/')
    .subscribe(response =>{
      console.log (response)
      this.allItem = response;
    })
  }
  addItem(title: string, desc: string, responsable: string, date: string){
    const newTask = {
      todo: title,
      description: desc,
      responsible: responsable,
      dueData: date,
      done: false
    }
    this.allItem.unshift(newTask)
    console.log(newTask)
    this.TodoService.postTask("https://todolist-vp6o.onrender.com/todo/create",newTask)
    .subscribe(data =>{
      console.log (data)
    });
  }

  updateItem(item: any) {
    this.TodoService.updateTask("https://todolist-vp6o.onrender.com/todo/update/${item._id}", item)
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  deleteItem(id: string) {
    this.TodoService.deleteTask("https://todolist-vp6o.onrender.com/todo/delete/${id}")
    .pipe(
      tap((res) => {
        console.log(res);
        // Eliminar la tarea de la lista local
        this.allItem = this.allItem.filter((item: any) => item._id !== id);
      })
    )
    .subscribe(
      () => {},
      (error) => {
        console.error(error);
      }

      
    );
  }

  get items() {
    if (this.filter === "all"){
      return this.allItem
    }
    return this.allItem.filter((item:Item)=>{
      this.filter ==="todo" ? item.todo : !item.todo
    })
  }

}

