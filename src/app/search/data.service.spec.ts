// import { TestBed } from '@angular/core/testing';
// import { BehaviorSubject } from 'rxjs';

// import { DataService } from './data.service';
// import { SearchResponse } from './search-response';

// describe('DataService', () => {
//   let service: DataService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(DataService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should change the message', () => {
//     const message: SearchResponse = {
//         isAvailable: true,
//         availableRoomList: [
//         {
//         hotelName: 'Hotel 1',
//           roomType: 'Room Type 1',
//           maxPeople: 1,
//           noOfRooms: 1,
//           markUp: 10,
//         },
//         {
//           hotelName: 'Hotel 2',
//           roomType: 'Room Type 2',
//           maxPeople: 2,
//           noOfRooms: 2,
//           markUp: 20,
//         },
//       ],
//     };
//     service.changeMessage(message);
//     service.currentMessage.subscribe((response) => {
//       expect(response.isAvailable).toEqual(message.isAvailable);
//       expect(response.availableRoomList).toEqual(message.availableRoomList);
//     });
//   });

//   it('should set the initial message', () => {
//     service.currentMessage.subscribe(response => {
//       expect(response.isAvailable).toEqual(false);
//       expect(response.availableRoomList).toEqual([]);
//     });
//   });

// });
