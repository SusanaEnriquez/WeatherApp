import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherAPIService } from '../services/weather-api.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  @Input() lon: any;
  @Input() lat: any;
  @Input() unit: any;
  @Input() simbol: any;
  @Input() currentData: any;
  @Output() newCurrent = new EventEmitter;
  forecast: any;
  daily: any;
  activeState: boolean[] = [true, false, false];
  current: any;

  constructor(private weatherApi: WeatherAPIService) { }

  ngOnInit(): void {
    this.weatherApi.getForecast(this.lat, this.lon, this.unit).subscribe(
      res => {
        this.forecast = res;
        this.daily = this.forecast.daily;
        this.current = this.daily[0];    
        this.newCurrent.emit(this.current);
      },       
      err => console.log(err)
    )
  }

  ngOnChanges(){
    this.weatherApi.getForecast(this.lat, this.lon, this.unit).subscribe(
      res => {
        this.forecast = res;
        this.daily = this.forecast.daily;
        this.current = this.daily[0];
        this.newCurrent.emit(this.current);        
      },       
      err => console.log(err)
    )    
  }


  getDays(day: number){
    var n = new Date (day * 1000).toDateString();
    n = n.substring(0, n.length-4)
    return n;
  }

  getHour(dt: number){
    var h = new Date (dt * 1000 + (1000 * this.currentData.timezone)).getUTCHours();
    var d = "pm";
    if(h<12) d = "am"
    h.toString();
    var m = new Date (dt * 1000 + (1000 * this.currentData.timezone)).getUTCMinutes().toString();
    var t = h + ":" + m + d
    return t
  }

}
