import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from './hotel';
import { environment } from 'src/environments/environment';
import { Page } from './page';

@Injectable({ providedIn: 'root' })
export class HotelService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiServerUrl}/hotel/all`);
  }

  public getHotel(page: number, size: number): Observable<Page<Hotel[]>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Hotel[]>>(
      `${this.apiServerUrl}/hotel/all/pages`,
      { params }
    );
  }

  public addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.apiServerUrl}/hotel/add`, hotel);
  }

  public updateHotel(hotel: Hotel, hotelId: number): Observable<Hotel> {
    return this.http.put<Hotel>(
      `${this.apiServerUrl}/hotel/update/${hotelId}`,
      hotel
    );
  }

  public getHotelByHotelId(hotelId: number): Observable<Hotel[]> {
    const url = `${this.apiServerUrl}/hotel/find/${hotelId}`;
    console.log('URL:', url);
    return this.http.get<Hotel[]>(url);
  }

  public deleteHotel(hotelId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/hotel/delete/${hotelId}`
    );
  }
}
