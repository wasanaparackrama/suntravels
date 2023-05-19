import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Contract } from './contract';


@Injectable({ providedIn: 'root' })
export class ContractService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getContract(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.apiServerUrl}/contract/all`);
  }

  public addContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(`${this.apiServerUrl}/contract/add`, contract);
  }

  public updateContract(contract: Contract,contractId: number): Observable<Contract> {
    return this.http.put<Contract>(`${this.apiServerUrl}/contract/update/${contractId}`, contract);
  }

  public getContractByHotel(hotelId: number): Observable<Contract[]> {
    const url = `${this.apiServerUrl}/contract/get/${hotelId}`;
    console.log('URL:', url);
    return this.http.get<Contract[]>(url);
    
  }

  public deleteContract(contractId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/contract/delete/${contractId}`
    );
  }
}
