import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { NgxPaginationModule } from 'ngx-pagination';
import { AllRoomsComponent } from './all-rooms.component';
import { AllRoomService } from './all-rooms.service';

describe('AllRoomsComponent', () => {
  let component: AllRoomsComponent;
  let fixture: ComponentFixture<AllRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllRoomsComponent],
      imports: [HttpClientTestingModule, FormsModule,NgxPaginationModule], // Add FormsModule here
      providers: [AllRoomService]
    }).compileComponents();
  
    fixture = TestBed.createComponent(AllRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
