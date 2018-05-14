import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryTodosService implements InMemoryDbService {
	createDb() {
		const todos = [];
		return { todos };
	}
}
