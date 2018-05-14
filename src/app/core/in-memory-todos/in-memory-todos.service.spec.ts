import { TestBed, inject } from '@angular/core/testing';

import { InMemoryTodosService } from './in-memory-todos.service';

describe('InMemoryTodosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryTodosService]
    });
  });

  it('should be created', inject([InMemoryTodosService], (service: InMemoryTodosService) => {
    expect(service).toBeTruthy();
  }));
});
