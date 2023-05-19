import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AllRoom } from './all-rooms';

@Injectable({ providedIn: 'root' })
export class AllRoomService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getRooms(): Observable<AllRoom[]> {
    return this.http.get<AllRoom[]>(`${this.apiServerUrl}/room/all`);
  }

  
}
