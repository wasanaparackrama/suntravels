import { Component } from '@angular/core';
import { AllRoomService } from './all-rooms.service';
import { AllRoom } from './all-rooms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent {

  public allRooms: AllRoom[];
  page = 1;
  ngOnInit(): void {
    this.getRooms();
  }
constructor(private allRoomService: AllRoomService){}
  public getRooms(): void {
    this. allRoomService.getRooms().subscribe(
      (response: AllRoom[]) => {
        this.allRooms = response;
        console.log(this.allRooms);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchRoom(key: string): void {
    console.log(key);
    const results: AllRoom[] = [];
    for (const room of this.allRooms) {
      if (
        room.roomType.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        room.hotelName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(room);
      }
    }
    this.allRooms = results;
    if (results.length === 0 || !key) {
      this.getRooms();
    }
  }


}
