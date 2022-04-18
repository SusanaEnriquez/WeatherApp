import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  @Input() currentData: any;
  @Input() simbol: any;
  @Input() time: any;
  @Output() unitChange = new EventEmitter();
  unit: string = "imperial"
  stateOptions: any[];
  
  constructor() {
    this.stateOptions = [{label: '°F', value: 'imperial'}, {label: '°C', value: 'metric'}];
   }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.changeUnit
  }

  changeUnit(){
    // console.log(this.unit);
    this.unitChange.emit(this.unit);
  }
}
