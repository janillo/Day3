import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todos-routing.module';
import { TodoComponent } from './todo/todo.component';
import { TodosService } from './todos-service/todos-service.service';
import { InMemoryTodosService } from '../core/in-memory-todos/in-memory-todos.service';

@NgModule({
	imports: [ CommonModule, TodoRoutingModule, AppMaterialModule ],
	declarations: [ TodoComponent ],
	providers: [ TodosService ]
})
export class TodoModule {}
