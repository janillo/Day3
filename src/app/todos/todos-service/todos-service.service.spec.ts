import { TodosService } from './todos-service.service';

import { TestBed, inject } from '@angular/core/testing';

describe('TodosServiceService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ TodosService ]
		});
	});

	it(
		'should be created',
		inject([ TodosService ], (service: TodosService) => {
			expect(service).toBeTruthy();
		})
	);
});
