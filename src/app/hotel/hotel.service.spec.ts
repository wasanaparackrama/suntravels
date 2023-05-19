import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HotelService } from './hotel.service';
import { Hotel } from './hotel';
import { environment } from 'src/environments/environment';

describe('HotelService', () => {
  let service: HotelService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiBaseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelService]
    });

    service = TestBed.inject(HotelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of hotels', () => {
    const mockHotels: Hotel[] = [
      { hotelId: 1, hotelName: 'Hotel 1', city: 'City 1', phoneNumber: '1234567890' },
      { hotelId: 2, hotelName: 'Hotel 2', city: 'City 2', phoneNumber: '9876543210' },
    ];

    service.getHotels().subscribe((hotels: Hotel[]) => {
      expect(hotels.length).toBe(2);
      expect(hotels).toEqual(mockHotels);
    });

    const request = httpMock.expectOne(`${apiUrl}/hotel/all`);
    expect(request.request.method).toBe('GET');
    request.flush(mockHotels);
  });

  it('should add a hotel', () => {
    const mockHotel: Hotel = { hotelId: 1, hotelName: 'New Hotel', city: 'New City', phoneNumber: '1234567890' };

    service.addHotel(mockHotel).subscribe((hotel: Hotel) => {
      expect(hotel).toEqual(mockHotel);
    });

    const request = httpMock.expectOne(`${apiUrl}/hotel/add`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockHotel);
    request.flush(mockHotel);
  });

  it('should update a hotel', () => {
    const mockHotel: Hotel = { hotelId: 1, hotelName: 'Updated Hotel', city: 'Updated City', phoneNumber: '1234567890' };
    const hotelId = 1;

    service.updateHotel(mockHotel, hotelId).subscribe((hotel: Hotel) => {
      expect(hotel).toEqual(mockHotel);
    });

    const request = httpMock.expectOne(`${apiUrl}/hotel/update/${hotelId}`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(mockHotel);
    request.flush(mockHotel);
  });

  it('should delete a hotel', () => {
    const hotelId = 1;

    service.deleteHotel(hotelId).subscribe(() => {
      expect().nothing();
    });

    const request = httpMock.expectOne(`${apiUrl}/hotel/delete/${hotelId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
