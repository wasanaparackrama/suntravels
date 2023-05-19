import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './room';
import { environment } from 'src/environments/environment';
import { Hotel } from '../hotel/hotel';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiServerUrl}/room/all`);
  }

  public addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiServerUrl}/room/add`, room);
  }

  public getRoomByHotel(hotelId: number): Observable<Room[]> {
    const url = `${this.apiServerUrl}/room/find/${hotelId}`;
    console.log('URL:', url);
    return this.http.get<Room[]>(url);
  }

  public getHotelByHotelId(hotelId: number): Observable<Hotel[]> {
    const url = `${this.apiServerUrl}/hotel/find/${hotelId}`;
    console.log('URL:', url);
    return this.http.get<Hotel[]>(url);
    
  }

  public updateRoom(room: Room, roomId: number): Observable<Room> {
    return this.http.put<Room>(
      `${this.apiServerUrl}/room/update/${roomId}`,
      room
    );
  }

  public deleteRoom(roomId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/room/delete/${roomId}`);
  }
}
