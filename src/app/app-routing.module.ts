import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './Rooms/rooms.component';
import { ContractComponent } from './contracts/contract.component';
import { HotelComponent } from './hotel/hotel.component';
import { SearchComponent } from './search/search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { AllContractsComponent } from './all-contracts/all-contracts.component';

const routes: Routes = [
  { component: HomePageComponent, path: '' },
  {
    component: RoomsComponent,
    path: 'room/:hotelId',
  },
  {
    component: HotelComponent,
    path: 'hotel',
  },
  {
    component: ContractComponent,
    path: 'contract/:hotelId',
  },

  {
    component: SearchComponent,
    path: 'searchRoom',
  },

  {
    component: AllRoomsComponent,
    path: 'room',
  },
  {
    component: AllContractsComponent,
    path: 'contract',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
