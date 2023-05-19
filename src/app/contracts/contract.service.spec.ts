import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContractService } from './contract.service';
import { Contract } from './contract';
import { environment } from 'src/environments/environment';

describe('ContractService', () => {
  let service: ContractService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiBaseUrl;

//   executed before each test case
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContractService]
    });

    service = TestBed.inject(ContractService);
    httpMock = TestBed.inject(HttpTestingController);
  });

//   after each test case to verify that no outstanding HTTP requests are pending
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of contracts', () => {
    const mockContracts: Contract[] = [
      { contractId: 1, startDate: new Date(), endDate: new Date(), markUp: 10, valid: true },
      { contractId: 2, startDate: new Date(), endDate: new Date(), markUp: 20, valid: true },
    ];

    service.getContract().subscribe((contracts: Contract[]) => {
      expect(contracts.length).toBe(2);
      expect(contracts).toEqual(mockContracts);
    });

    const request = httpMock.expectOne(`${apiUrl}/contract/all`);
    expect(request.request.method).toBe('GET');
    request.flush(mockContracts);
  });

  it('should add a contract', () => {
    const mockContract: Contract = { contractId: 1, startDate: new Date(), endDate: new Date(), markUp: 10, valid: true };

    service.addContract(mockContract).subscribe((contract: Contract) => {
      expect(contract).toEqual(mockContract);
    });

    const request = httpMock.expectOne(`${apiUrl}/contract/add`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockContract);
    request.flush(mockContract);
  });

  it('should update a contract', () => {
    const mockContract: Contract = { contractId: 1, startDate: new Date(), endDate: new Date(), markUp: 10, valid: true };
    const contractId = 1;

    service.updateContract(mockContract, contractId).subscribe((contract: Contract) => {
      expect(contract).toEqual(mockContract);
    });

    const request = httpMock.expectOne(`${apiUrl}/contract/update/${contractId}`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(mockContract);
    request.flush(mockContract);
  });

  it('should retrieve contracts by hotel', () => {
    const hotelId = 1;
    const mockContracts: Contract[] = [
      { contractId: 1, startDate: new Date(), endDate: new Date(), markUp: 10, valid: true },
      { contractId: 2, startDate: new Date(), endDate: new Date(), markUp: 20, valid: true },
    ];

    service.getContractByHotel(hotelId).subscribe((contracts: Contract[]) => {
      expect(contracts.length).toBe(2);
      expect(contracts).toEqual(mockContracts);
    });

    const request = httpMock.expectOne(`${apiUrl}/contract/get/${hotelId}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockContracts);
  });

  it('should delete a contract', () => {
    const contractId = 1;

    service.deleteContract(contractId).subscribe(() => {
        expect().nothing();
      });
  
        const request = httpMock.expectOne(`${apiUrl}/contract/delete/${contractId}`);
        expect(request.request.method).toBe('DELETE');
        request.flush(null);
    });
});       