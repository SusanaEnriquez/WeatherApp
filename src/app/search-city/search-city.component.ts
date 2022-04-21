import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnInit {

  @Output() searchC: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  searchCity(cityName: any){
    this.searchC.emit(cityName.value);   
    cityName.value = "";
  }
}
