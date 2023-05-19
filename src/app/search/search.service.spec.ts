// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { SearchService } from './search.service';
// import { SearchRequest } from './search-request';
// import { SearchResponse } from './search-response';


// describe('SearchService', () => {
//   let service: SearchService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [SearchService],
//     });
//     service = TestBed.inject(SearchService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should return SearchRoomResponse with available rooms', () => {

//     const mockRequest: SearchRequest = {
//         checkInDate : new Date("2023-03-10"),
//         noOfNights : 10,
//         roomRequests :[
//             {
//                 noOfRooms : 3,
//                 noOfAdults : 1
//             },
//             {
//                 noOfRooms : 2,
//                 noOfAdults : 2
//             },
//             {
//                 noOfRooms : 1,
//                 noOfAdults : 3
//             }
//         ]
//     };

//     const mockResponse: SearchResponse = {
//         isAvailable: true,
//         availableRoomList: [
//             {
//                 hotelName: "Hotel 1",
//                 roomType: "Room Type 1-1",
//                 maxPeople: 5,
//                 noOfRooms: 20,
//                 markUp: 125.0
//             },
//             {
//                 hotelName: "Hotel 2",
//                 roomType: "Room Type 2",
//                 maxPeople: 3,
//                 noOfRooms: 15,
//                 markUp: 100.0
//             }
//         ]
//     };
//     service.getRoomsAvailability(mockRequest).subscribe((response) => {
//       expect(response).toEqual(mockResponse);
//     });

//     const req = httpMock.expectOne(`${service['apiServerUrl']}`);
//     expect(req.request.method).toBe('POST');
//     expect(req.request.body).toEqual(mockRequest);
//     req.flush(mockResponse);
//   });

// });
