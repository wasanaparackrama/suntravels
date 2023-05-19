import { Component, Input, OnInit } from '@angular/core';
import { SearchResponse } from '../search/search-response';
import { Room } from '../Rooms/room';
import { DataService } from '../search/data.service';
import { AvailableRoom } from '../search/AvailableRoom';

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styleUrls: ['./search-result-table.component.css'],
})
export class SearchResultTableComponent implements OnInit {
  @Input() searchResponse!: SearchResponse;

  dataSource!: AvailableRoom[];
  // dataSource: AvailableRoom[] = [];
  page = 1;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe((message) => {
      this.dataSource = message.availableRoomList;
    });
  }

  displayedColumns: string[] = [
    'Hotel Name',
    'Room Type',
    'Maximum Adults Per Room',
    'No of Rooms',
    'Final Price',
  ];

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

}
