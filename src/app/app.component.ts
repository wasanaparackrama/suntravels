import { Component, OnInit } from '@angular/core';
import { Hotel } from './hotel/hotel';
import { HttpErrorResponse } from '@angular/common/http';
import { HotelService } from './hotel/hotel.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SunTravels_FrontEnd';
}
