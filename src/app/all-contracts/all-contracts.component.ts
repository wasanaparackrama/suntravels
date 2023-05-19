import { Component } from '@angular/core';
import { AllContracts } from './all-contracts';
import { AllContractService } from './all-contracts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-contracts',
  templateUrl: './all-contracts.component.html',
  styleUrls: ['./all-contracts.component.css']
})
export class AllContractsComponent {


  public allContracts: AllContracts[];
  page = 1;
  ngOnInit(): void {
    this.getContracts();
  }


  isContractValid(allContracts:AllContracts): boolean {
    const currentDate = new Date();
    const startDate = new Date(allContracts.startDate);
    const endDate = new Date(allContracts.endDate);
    return currentDate <= endDate;
  }
constructor(private allContractService: AllContractService){}
  public getContracts(): void {
    this.allContractService.getContract().subscribe(
      (response: AllContracts[]) => {
        this.allContracts = response;
        console.log(this.allContracts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchRoom(key: string): void {
    console.log(key);
    const results: AllContracts[] = [];
    for (const contract of this.allContracts) {
      if (
        
        contract.hotelName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) 
      {
        results.push(contract);
      }
    }
    this.allContracts = results;
    if (results.length === 0 || !key) {
      this.getContracts();
    }
  }


}
