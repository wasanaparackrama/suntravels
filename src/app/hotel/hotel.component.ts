import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Hotel } from './hotel';
import { HotelService } from './hotel.service';
import { NgForm } from '@angular/forms';
import { Page } from './page';
import { PaginationInstance } from 'ngx-pagination'; 
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
})
export class HotelComponent {
  // public hotels: Hotel[];
  public editHotel: Hotel;
  public deleteHotel: Hotel;
  page = 1;
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  hotelName: any;

  public hotels: Hotel[]= [];
  totalPages=0;
 
  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.getHotel();
  }

  // get pagedHotels(): Hotel[] {
  //   const startIndex = (this.page - 1) * this.pageSize;
  //   return this.hotels.slice(startIndex, startIndex + this.pageSize);
  // }

  randomImages = [
    'assets/home.jpg',
    'assets/hotel.jpg',
    'assets/hotel1.jpg',
    'assets/hotel2.jpg',
    'assets/hotel3.jpg',
    'assets/hotel4.jpg',
    'assets/hotel5.jpg',
    'assets/hotel6.jpg',
    'assets/hotel7.jpg',
    'assets/hotel8.jpg',
    'assets/hotel9.jpg',
    'assets/hotel10.jpg',
    'assets/hotela.jpg',
    'assets/hotelb.jpg',
  ];
  usedImages: string[] = [];

  getRandomImage(): string {
    if (this.usedImages.length === this.randomImages.length) {
      this.usedImages = [];
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.randomImages.length);
    } while (this.usedImages.includes(this.randomImages[randomIndex]));

    const randomImage = this.randomImages[randomIndex];
    this.usedImages.push(randomImage);

    return randomImage;
  }

  // public   getHotels(): void {
  //   this.hotelService.getHotels(this.currentPage - 1, this.pageSize).subscribe(
  //     (response: Page<Hotel[]>) => {
  //       this.hotels = response.content.flat();
  //       this.totalItems = response.totalElements;
  //       console.log("%%%%%%%%%%%%%%%%%%%%%",response.content.flat())
  //     },
  //     (error) => {
  //       alert(error.message);
  //     }
  //   );
  // }

 public getHotel(): void {
    this.hotelService.getHotel(this.currentPage- 1, this.pageSize).subscribe(
      (response: Page<Hotel[]>) => {
        this.hotels = response.content.flat();
        this.totalItems = response.totalElements;
        this.totalPages = response.totalPages;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getHotel(); // Corrected method name to getHotels()
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getHotel(); // Corrected method name to getHotels()
    }
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

  

  public onAddHotel(addForm: NgForm): void {
    if (addForm.invalid) {
      Object.keys(addForm.controls).forEach((field) => {
        const control = addForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const newHotel: Hotel = addForm.value;

    // Check if the new hotel already exists
    const isHotelExists = this.hotels.some(
      (hotel) =>
        hotel.hotelName.toLowerCase() === newHotel.hotelName.toLowerCase() &&
        hotel.city.toLowerCase() === newHotel.city.toLowerCase()
    );

    if (isHotelExists) {
      alert('The hotel already exists.');
      return;
    }

    document.getElementById('add-hotel-form')?.click;
    this.hotelService.addHotel(addForm.value).subscribe(
      (response: Hotel) => {
        console.log(response);
        this.getHotels();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateHotel(hotel: Hotel, hotelId: number): void {
    // document.getElementById('add-hotel-form')?.click;
    this.hotelService.updateHotel(hotel, hotelId).subscribe(
      (response: Hotel) => {
        console.log(response);
        this.getHotels();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteHotel(hotelId: number): void {
    this.hotelService.deleteHotel(hotelId).subscribe(
      (response: void) => {
        console.log(response);
        this.getHotels();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchHotel(key: string): void {
    console.log(key);
    const results: Hotel[] = [];
    for (const hotel of this.hotels) {
      if (
        hotel.hotelName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        hotel.city.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(hotel);
      }
    }
    this.hotels = results;
    if (results.length === 0 || !key) {
      this.getHotels();
    }
  }

  public onOpenModal(hotel: Hotel, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'edit') {
      this.editHotel = hotel;
      button.setAttribute('data-target', '#updateHotelModal');
    }
    if (mode === 'delete') {
      this.deleteHotel = hotel;
      button.setAttribute('data-target', '#deleteHotelModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModalAdd(hotel: Hotel | null | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addHotelModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
