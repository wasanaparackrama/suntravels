import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchRequest } from '../search/search-request';
import { SearchResponse } from '../search/search-response';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { SearchService } from '../search/search.service';
import { DataService } from '../search/data.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  @Output() onSearchResults: EventEmitter<Boolean> = new EventEmitter();

  public searchForm!: FormGroup;
  

  constructor(
    private _fb: FormBuilder,
    private searchService: SearchService,
    private dataService: DataService
  ) {}
  ngOnInit() {
    this.searchForm = this._fb.group({
      checkInDate: null,
      noOfNights: null,
      roomRequests: this._fb.array([this.initRows()]),
    });
  }

  get formArr() {
    return this.searchForm.get('roomRequests') as FormArray;
  }

  initRows() {
    return this._fb.group({
      noOfAdults: [],
      noOfRooms: [],
    });
  }

  addNewRow() {
    this.formArr.push(this.initRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  onSubmit() {
    if (!this.searchForm.value.checkInDate) {
      alert('Please add the check in date!');
      return;
    }

    const enteredDate = new Date(this.searchForm.value.checkInDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (enteredDate < today) {
      alert('Please select a valid date for check-in!');
      return;
    }

    if (!this.searchForm.value.noOfNights) {
      alert('Please add the number of nights of the reservation!');
      return;
    }

    // if (!this.searchForm.value.noOfAdults || !this.searchForm.value.noOfRooms) {
    //   alert('Please add the room requiremets!');
    //   return;
    // }

    const newSearchRoomRequest: SearchRequest = {
      checkInDate: this.searchForm.value.checkInDate,
      noOfNights: this.searchForm.value.noOfNights,
      roomRequests: this.searchForm.value.roomRequests,
    };

    console.log(newSearchRoomRequest);

    // this.searchRoomService.getRoomsAvailability(newSearchRoomRequest).subscribe((response) => this.onSearchResults.emit(response));

    this.searchService
      .getRoomsAvailability(newSearchRoomRequest)
      .subscribe((response) => this.sendResponseToTable(response));
  }

  sendResponseToTable(response: SearchResponse) {
    this.onSearchResults.emit(response.isAvailable);
    this.dataService.changeMessage(response);
    console.log(response['availableRoomList']);
  }
}
