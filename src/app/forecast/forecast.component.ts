import { Component, OnInit, Input } from '@angular/core';
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
  forecast: any;
  daily: any;
  activeState: boolean[] = [true, false, false];
  current: any;
  // iconUrl: string = "http://openweathermap.org/img/wn/{{day.weather[0].icon}}@2x.png";

  constructor(private weatherApi: WeatherAPIService) { }

  ngOnInit(): void {
    this.weatherApi.getForecast(this.lat, this.lon, this.unit).subscribe(
      res => {
        this.forecast = res;
        this.daily = this.forecast.daily;
        this.current = this.daily[0];     
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
        // console.log(this.daily); 
        // console.log(this.forecast);
        // console.log(this.current);
        
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

  // getIcon(){
  //   this.iconUrl = "http://openweathermap.org/img/wn/" + this.daily.weather[0].icon + "@2x.png"
  // }

}
