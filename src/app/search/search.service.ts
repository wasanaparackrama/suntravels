import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SearchResponse } from './search-response';
import { SearchRequest } from './search-request';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }),
};


@Injectable({ providedIn: 'root' })
export class SearchService {
  // private apiServerUrl =`${environment.apiBaseUrl}/searchRoom`;
  // 
  private apiUrl = "http://localhost:8080/searchRoom";
  private endPoint = `${this.apiUrl}`;


  constructor(private http: HttpClient) {}

  

  getRoomsAvailability( searchRequest: SearchRequest): Observable<SearchResponse> {
   

    return this.http.post<SearchResponse>(
      this.endPoint,
      searchRequest,
      httpOptions
    );
  }

  
  }
