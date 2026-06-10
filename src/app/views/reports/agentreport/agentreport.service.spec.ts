import { TestBed } from '@angular/core/testing';

import { AgentreportService } from './agentreport.service';

describe('AgentreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentreportService = TestBed.inject(AgentreportService);
    expect(service).toBeTruthy();
  });
});
