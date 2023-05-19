import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchResultTableComponent } from '../search-result-table/search-result-table.component';
import { MatTableModule } from '@angular/material/table';
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule,MatTableModule,NgxPaginationModule],
      declarations: [SearchComponent, SearchFormComponent, SearchResultTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
