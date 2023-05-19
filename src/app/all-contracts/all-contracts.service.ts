import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AllContracts } from './all-contracts';


@Injectable({ providedIn: 'root' })
export class AllContractService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getContract(): Observable<AllContracts[]> {
    return this.http.get<AllContracts[]>(`${this.apiServerUrl}/contract/all`);
  }

  
}
