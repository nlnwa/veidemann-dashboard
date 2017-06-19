import {TestBed, inject} from "@angular/core/testing";
import {DocumentationService} from "./documentation.service";

describe('DocumentationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentationService]
    });
  });

  it('should ...', inject([DocumentationService], (service: DocumentationService) => {
    expect(service).toBeTruthy();
  }));
});
