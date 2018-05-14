import { Todo } from './../model/todo.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, filter, flatMap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

const URL =
	'https://gist.githubusercontent.com/jdjuan/165053e6cb479a840c88e3e94b33e724/raw/4542ef950b2b32fbe2eea0b3df0338ffe67eae12/todo.json';

@Injectable({
	providedIn: 'root'
})
export class TodosService {
	constructor(private http: HttpClient) {}

	getInitialTodos() {
		return this.http.get<string[]>(URL).pipe(
			map((todo) => {
				const newTodo = todo.map((todo) => {
					return new Todo(uuid(), todo, false);
				});
				return newTodo;
			})
		);
	}

	postTodos(payload): Observable<Todo> {
		return this.http
			.post<Todo>('api/todos', payload)
			.pipe(map((response: any) => response), catchError(this.handleError));
	}

	getTodos(): Observable<Todo[]> {
		return this.http
			.get<Todo[]>(`api/todos`)
			.pipe(catchError((error: any) => Observable.throw(error.json())));
	}

	putTodos(payload): Observable<Todo> {
		return this.http
			.put<Todo>(`api/todos/${payload.id}`, payload)
			.pipe(map((response: any) => response));
	}

	getTasksState(state): Observable<Todo[]> {
		return this.http
			.get<Todo[]>(`api/todos?state=${state}`)
			.pipe(catchError((error: any) => Observable.throw(error.json())));
	}

	deleteTodos(payload): Observable<Todo> {
		return this.http.delete<any>(`api/todos/${payload}`).pipe(map((response: any) => response));
	}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
		} else {
			console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
		}
		return throwError('Something bad happened; please try again later.');
	}
}
