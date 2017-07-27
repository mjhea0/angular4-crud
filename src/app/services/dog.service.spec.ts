import { TestBed, inject } from '@angular/core/testing';

import { DogService } from './dog.service';

describe('DogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DogService]
    });
  });

  it('should be created', inject([DogService], (service: DogService) => {
    expect(service).toBeTruthy();
  }));
});
