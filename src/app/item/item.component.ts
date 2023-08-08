import { Component, Input } from '@angular/core';
import { Item } from '../shared/models/item';
import { TodoService } from '../core/service/todo.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  constructor(private TodoService: TodoService,){

  }
  @Input() Item!: Item
  

  

  deleteItem(id: string){
    
      this.TodoService.deleteTask('https://todolist-vp6o.onrender.com/todo/delete/' + id).subscribe(
        (res) => {
          console.log(res);
        })
    
  }

  updateItem(title: string, desc: string, responsable: string, date: string): void {
    const updatedTask = {
      todo: title,
      description: desc,
      responsible: responsable,
      dueData: date,
      done: false
    }
    console.log(this.Item._id)
    // si actualiza pero falta arreglar el bug de app.component, el back al crear una tarea debe responder con la tarea que contenga el id para asignarla a allitems y que se pueda usar el id para borrar
    // si se crea una tarea solo se puede actualizar o borrar si recargas la pagina primero ya que el back vuelve a responder la data con el id.
      this.TodoService.updateTask('https://todolist-vp6o.onrender.com/todo/update/' + this.Item._id,updatedTask).subscribe(
        (data) => {console.log(data)}
      )
    }
}
