import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  @Input() currentData: any;
  @Input() newCurrent: any;
  @Input() simbol: string = "";
  @Input() time: any;
  @Output() unitChange: EventEmitter<string> = new EventEmitter<string>();
  unit: string = "imperial"
  stateOptions: any[];
  temp = [];
  
  constructor() {
    this.stateOptions = [{label: '°F', value: 'imperial'}, {label: '°C', value: 'metric'}];
   }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.changeUnit
  }

  changeUnit(){
    this.unitChange.emit(this.unit);
  }
}
