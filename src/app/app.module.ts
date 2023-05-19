import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelService } from './hotel/hotel.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomsComponent } from './Rooms/rooms.component';
import { ContractComponent } from './contracts/contract.component';
import { HotelComponent } from './hotel/hotel.component';
import { SearchComponent } from './search/search.component';
// import { RoomSearchComponent } from '';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultTableComponent } from './search-result-table/search-result-table.component';

import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { NgxPaginationModule } from 'ngx-pagination';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { AllContractsComponent } from './all-contracts/all-contracts.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    ContractComponent,
    HotelComponent,
    SearchComponent,

    SearchFormComponent,
    SearchResultTableComponent,
    FooterComponent,
    HomePageComponent,
    HeaderComponent,
    AllRoomsComponent,
    AllContractsComponent,
  ],
  imports: [
    MatPaginatorModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatIconModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
