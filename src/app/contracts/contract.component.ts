import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contract } from './contract';
import { ContractService } from './contract.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomService } from '../Rooms/room.service';
import { Room } from '../Rooms/room';
import { HotelService } from '../hotel/hotel.service';
import { Hotel } from '../hotel/hotel';

@Component({
  selector: 'app-contracts',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
})
export class ContractComponent {
  public contracts: Contract[];
  public editContract: Contract;
  public deleteContract: Contract;
  public addContract: Contract;
  page = 1;
  hotelId: number;
  contractId: number;
  roomId: number;
  public rooms: Room[];
  public addRoom: Room;
  startDate!: Date;
  endDate!: Date;
  markup!: number;
  public hotelName: string;
  public hotel: Hotel;
  valid: boolean;
  currentDate: Date;
  hotels: Hotel[];
  constructor(
    private contractService: ContractService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private hotelService: HotelService,
  ) {}

  // ngOnInit(): void {
  //   this.getContract();
  // }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.params['hotelId'];
    console.log('Hotel ID:', this.hotelId);
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
    this.getHotelByHotelId(this.hotelId);
  }

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

  public onAddContract(addForm: NgForm): void {
    this.startDate = new Date(addForm.value.startDate);
    this.endDate = new Date(addForm.value.endDate);

    if (this.startDate >= this.endDate) {
      alert('Start date must be before end date');
      return;
    }

    document.getElementById('add-contract-form')?.click;
    console.log(addForm.value);
    this.contractService.addContract(addForm.value).subscribe(
      (response: Contract) => {
        console.log(response);
        this.getContractByHotel(this.hotelId);
        addForm.controls['startDate'].reset();
        addForm.controls['endDate'].reset();
        addForm.controls['markUp'].reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  isContractValid(contract: Contract): boolean {
    const currentDate = new Date();
    const startDate = new Date(contract.startDate);
    const endDate = new Date(contract.endDate);
    return currentDate <= endDate;
  }

  public onUpdateContract(contract: Contract, contractId: number): void {
    // document.getElementById('add-hotel-form')?.click;
    this.contractService.updateContract(contract, contractId).subscribe(
      (response: Contract) => {
        console.log(response);
        this.getContractByHotel(this.hotelId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteContract(contractId: number): void {
    this.contractService.deleteContract(contractId).subscribe(
      (response: void) => {
        console.log(response);
        this.getContractByHotel(this.hotelId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchContract(key: string): void {
    console.log(key);
    const results: Contract[] = [];
    for (const contract of this.contracts) {
      if (
        contract.contractId === parseInt(key)
      ) {
      results.push(contract);
      }
    }
    this.contracts = results;
    if (results.length === 0 || !key) {
      this.getContractByHotel(this.hotelId);
    }
  }

  public onOpenModal(contract: Contract, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'edit') {
      this.editContract = contract;
      button.setAttribute('data-target', '#updateContractModal');
    }
    if (mode === 'delete') {
      this.deleteContract = contract;
      button.setAttribute('data-target', '#deleteContractModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModalAdd(contract: Contract | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'addContract') {
      button.setAttribute('data-target', '#addContractModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onOpenModalRoomAdd(room: Room | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'addRoom') {
      button.setAttribute('data-target', '#addRoomModal');
    }

    container?.appendChild(button);
    button.click();
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

  public onAddRoom(addForm: NgForm): void {
    document.getElementById('add-room-form')?.click;
    console.log('*****************', addForm.value);
    this.roomService.addRoom(addForm.value).subscribe(
      (response: Room) => {
        console.log(response);
        this.getRoomsByHotel(this.hotelId);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}
