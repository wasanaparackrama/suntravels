// import { ComponentFixture, TestBed } from '@angular/core/testing';


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractComponent } from './contract.component';
import { ContractService } from './contract.service';
import { RoomService } from '../Rooms/room.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ContractComponent', () => {
  let component: ContractComponent;
  let fixture: ComponentFixture<ContractComponent>;
  let contractService: jasmine.SpyObj<ContractService>;
  let roomService: jasmine.SpyObj<RoomService>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const contractServiceSpy = jasmine.createSpyObj('ContractService', [
      'getContractByHotel',
      'addContract',
      'updateContract',
      'deleteContract',
    ]);
    const roomServiceSpy = jasmine.createSpyObj('RoomService', [
      'getRoomByHotel',
      'addRoom',
    ]);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { params: { hotelId: 123 } },
    });

    await TestBed.configureTestingModule({
        imports: [FormsModule,RouterModule , HttpClientTestingModule,NgxPaginationModule],
      declarations: [ContractComponent],
      providers: [
        { provide: ContractService, useValue: contractServiceSpy },
        { provide: RoomService, useValue: roomServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    contractService = TestBed.inject(ContractService) as jasmine.SpyObj<ContractService>;
    roomService = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;

    fixture = TestBed.createComponent(ContractComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  

    // it('should handle error if fetching contracts fails', () => {
    //   const errorMessage = 'Failed to fetch contracts';
    //   contractService.getContractByHotel.and.throwError(errorMessage);

    //   spyOn(console, 'error');
    //   spyOn(window, 'alert');

    //   component.ngOnInit();

    //   expect(contractService.getContractByHotel).toHaveBeenCalledWith(123);
    //   expect(console.error).toHaveBeenCalledWith('Error:', errorMessage);
    //   expect(window.alert).toHaveBeenCalledWith(errorMessage);
    // });
  });

  
    
    
























// import { ContractComponent } from './contract.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('ContractsComponent', () => {
//   let component: ContractComponent;
//   let fixture: ComponentFixture<ContractComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ContractComponent],
//       imports: [HttpClientTestingModule], // add HttpClientTestingModule to imports
//     }).compileComponents();
//   });

//   beforeEach(async () => {
//     // await TestBed.configureTestingModule({
//     //   declarations: [ContractComponent],
//     // }).compileComponents();

//     fixture = TestBed.createComponent(ContractComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
