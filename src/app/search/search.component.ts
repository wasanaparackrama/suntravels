import { Component ,Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  

  isResultsRecieved: Boolean = false;
  showNotAvailableLabel: Boolean = false;

  updateVariables(resultsAvailability: Boolean){
    this.isResultsRecieved = resultsAvailability;
    this.showNotAvailableLabel = !resultsAvailability;
    console.log(resultsAvailability)
    
  }

}
