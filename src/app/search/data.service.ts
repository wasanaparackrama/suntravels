import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchResponse } from './search-response';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchResponse: SearchResponse = {
    isAvailable: false,
    availableRoomList: []
  }
  private messageSource = new BehaviorSubject<SearchResponse>(this.searchResponse);
  
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: SearchResponse) {
    this.messageSource.next(message);
  }
}
