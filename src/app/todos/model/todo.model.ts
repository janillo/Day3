export class Todo {
	id: string;
	task: string;
	state: boolean;

	constructor(id: string, task: string, state: boolean) {
		this.id = id;
		this.task = task;
		this.state = state;
	}
}
