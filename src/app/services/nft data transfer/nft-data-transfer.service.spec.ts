import { TestBed } from '@angular/core/testing';

import { NftDataTransferService } from './nft-data-transfer.service';

describe('NftDataTransferService', () => {
  let service: NftDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
