import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodosService } from '../todos-service/todos-service.service';
import { Todo } from '../model/todo.model';
import { MatSelectionList, MatListOption } from '@angular/material';
import { ViewChild } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { SelectionChange } from '@angular/cdk/collections';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: [ './todo.component.scss' ]
})
export class TodoComponent implements OnInit {
	@ViewChild('tasks') tasks: MatSelectionList;

	todos$;
	loadInitialTodo = false;
	valueTask = '';
	loadSpinner = false;

	constructor(private http: HttpClient, private todosService: TodosService) {}

	ngOnInit() {
		this.initialTodos();
		this.tasks.selectedOptions.onChange.subscribe((data) => {
			if (!this.loadInitialTodo) {
				this.detectChanges(data);
			}
		});
	}

	initialTodos() {
		this.todosService.getInitialTodos().subscribe((data) => {
			data.map((todo) =>
				this.todosService.postTodos(todo).subscribe(() => this.refreshTodos())
			);
		});
	}

	refreshTodos() {
		this.todos$ = this.todosService.getTodos();
	}

	deleteTodo(id: string) {
		this.todosService.deleteTodos(id).subscribe(() => this.refreshTodos());
	}

	addTodo(event) {
		if (event) {
			this.valueTask = '';
			this.todosService
				.postTodos(new Todo(uuid(), event, false))
				.subscribe(() => this.refreshTodos());
		}
	}

	selectAll(event) {
		this.loadInitialTodo = false;
		if (event.checked) {
			this.tasks.selectAll();
		} else {
			this.tasks.deselectAll();
		}
	}

	filterTodos(state) {
		this.loadInitialTodo = true;
		this.todos$ = this.todosService.getTasksState(state);
	}

	detectChanges(data: SelectionChange<MatListOption>) {
		let todo: Todo;
		if (data.added.length > 0) {
			todo = data.added[0].value;
			todo.state = true;
			this.todosService.putTodos(todo).subscribe();
		} else {
			todo = data.removed[0].value;
			todo.state = false;
			this.todosService.putTodos(todo).subscribe();
		}
	}
}
