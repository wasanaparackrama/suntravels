import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Room } from './room';
import { RoomService } from './room.service';
import { ContractService } from '../contracts/contract.service';
import { Contract } from '../contracts/contract';
import { Hotel } from '../hotel/hotel';
import { HotelService } from '../hotel/hotel.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomsComponent {
  public rooms: Room[];
  public editRoom: Room;
  public deleteRoom: Room;
  public contracts: Contract[];
  public hotel: Hotel;
  hotelId: number;
  contractId: number;
  public hotelName: string;
  page = 1;
  hotels: Hotel[];

  constructor(
    private roomService: RoomService,
    private contractService: ContractService,
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.params['hotelId'];
    console.log('Hotel ID:', this.hotelId);

    this.roomService.getRoomByHotel(this.hotelId).subscribe(
      (rooms) => {
        this.rooms = rooms;
        console.log('Contracts:', this.rooms);
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    this.contractService.getContractByHotel(this.hotelId).subscribe(
      (contracts) => {
        this.contracts = contracts;
        console.log('Contracts:', this.contracts);
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    this.getHotelByHotelId(this.hotelId);
  }

  public getHotels(): void {
    this.hotelService.getHotels().subscribe(
      (response: Hotel[]) => {
        this.hotels = response;
        console.log(this.hotels);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getRooms(): void {
    this.roomService.getRooms().subscribe(
      (response: Room[]) => {
        this.rooms = response;
        console.log(this.rooms);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getContract(): void {
    this.contractService.getContract().subscribe(
      (response: Contract[]) => {
        this.contracts = response;
        console.log(this.contracts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getHotelByHotelId(hotelId: number): void {
    this.hotelService.getHotelByHotelId(hotelId).subscribe(
      (response: Hotel[] | Hotel) => {
        if (Array.isArray(response)) {
          // If response is an array of hotels
          this.hotels = response;
          for (const hotel of this.hotels) {
            const hotelName = hotel.hotelName;
            this.hotelName = hotelName; // Assign the hotel name to the property
            console.log('Hotel Name:', hotelName);
          }
        } else {
          // If response is a single hotel
          this.hotels = [response];
          const hotelName = response.hotelName;
          this.hotelName = hotelName; // Assign the hotel name to the property
          console.log('Hotel Name:', hotelName);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getHotelByHotelId(hotelId: number): void {
  //   this.hotelService.getHotelByHotelId(hotelId).subscribe(
  //     (response: Hotel[] | Hotel) => {
  //       if (Array.isArray(response)) {
  //         this.hotels = response;
  //         for (const hotel of this.hotels) {
  //           const hotelName = hotel.hotelName;
  //           console.log("Hotel Name:", hotelName);
  //         }
  //       } else {
  //         this.hotels = [response];
  //         const hotelName = response.hotelName;
  //         console.log("Hotel Name:", hotelName);
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public getContractByHotel(hotelId: number): void {
    this.contractService.getContractByHotel(hotelId).subscribe(
      (response: Contract[]) => {
        this.contracts = response;
        console.log(this.contracts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getRoomsByHotel(hotelId: number): void {
    this.roomService.getRoomByHotel(hotelId).subscribe(
      (response: Room[]) => {
        this.rooms = response;
        console.log(this.rooms);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  isContractValid(contract: any): boolean {
    const currentDate = new Date();
    const endDate = new Date(contract.endDate);
    return currentDate <= endDate;
  }

  public onAddRoom(addForm: NgForm): void {
    const newRoom: Room = addForm.value;
    const isRoomExists = this.rooms.some(
      (room) =>
        room.roomType.toLowerCase() === newRoom.roomType.toLowerCase() &&
        room.cost === newRoom.cost &&
        room.maxPeople === newRoom.maxPeople &&
        room.noOfRooms === newRoom.noOfRooms
    );

    if (isRoomExists) {
      alert('The room already exists.');
      return;
    }

    document.getElementById('add-room-form')?.click;
    this.roomService.addRoom(addForm.value).subscribe(
      (response: Room) => {
        console.log(response);
        this.getRoomsByHotel(this.hotelId);
        // this.getContractByHotel(this.hotelId);
        addForm.controls['roomType'].reset();
        addForm.controls['noOfRooms'].reset();
        addForm.controls['maxPeople'].reset();
        addForm.controls['cost'].reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateRoom(room: Room, roomId: number): void {
    // document.getElementById('add-hotel-form')?.click;
    this.roomService.updateRoom(room, roomId).subscribe(
      (response: Room) => {
        console.log(response);
        this.getRoomsByHotel(this.hotelId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteRoom(roomId: number): void {
    this.roomService.deleteRoom(roomId).subscribe(
      (response: void) => {
        console.log(response);
        this.getRoomsByHotel(this.hotelId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchRoom(key: string): void {
    console.log(key);
    const results: Room[] = [];
    for (const room of this.rooms) {
      if (room.roomType.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(room);
      }
    }
    this.rooms = results;
    if (results.length === 0 || !key) {
      this.getRoomsByHotel(this.hotelId);
    }
  }

  public onOpenModal(room: Room, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'edit') {
      this.editRoom = room;
      button.setAttribute('data-target', '#updateRoomModal');
    }
    if (mode === 'delete') {
      this.deleteRoom = room;
      button.setAttribute('data-target', '#deleteRoomModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModalAdd(room: Room | null | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addRoomModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
