import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from './services/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  city: string = "México";
  currentData: any;
  newCurrent: any;
  time: any;
 
  unit: string = "imperial";
  icon: string = "default";
  simbol: string = "°F";
  lat: number = 19.4285;
  lon: number = -99.1277;


  constructor(private weatherApi: WeatherAPIService){}

  ngOnInit(){
    this.weatherApi.getWeather("México", this.unit).subscribe(
      res => {
        this.city = "México";
        this.currentData = res;
        this.time = this.getTime();
        if (this.unit=="metric") {
          this.simbol = "°C"
        } else {
          this.simbol = "°F"
        }
      },       
      err => console.log(err)
    )
  }

  getWeather(cityName: string){
    this.weatherApi.getWeather(cityName, this.unit).subscribe(
      res => {
        this.city= cityName;
        this.currentData = res;
        this.time = this.getTime();
        if (this.unit=="metric") {
          this.simbol = "°C"
        } else {
          this.simbol = "°F"
        }
        this.lon = this.currentData.coord.lon;
        this.lat = this.currentData.coord.lat;
      },       
      err => {
        console.log(err);
        alert("Sorry, I couldn't find that city :(")
      }
    )   
  }

  searchCity(city: any){
    this.getWeather(city);
    return false;
  }

  getTime(){
    const date = new Date();
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    var realtime = utc + (1000 * this.currentData.timezone);
    var nd = new Date(realtime);       
    return nd
  }

  changeUnit(e: any){
    this.unit = e;
    if (this.unit=="metric") {
      this.simbol = "°C"
      this.getWeather(this.city)
    } else {
      this.simbol = "°F"
      this.getWeather(this.city)
    }
  }

  getCurrent(e: any){
    this.newCurrent = e;
    this.icon = this.newCurrent.weather[0].icon;
    this.getBackground();
  }

  getBackground(): any {
    switch (this.icon) {
      case '01d':      
        return "url('../assets/01d.jpg')";
      case '01n':
        return "url('../assets/01n.jpg')";
      case '02d':
        return "url('../assets/02d.jpg')";
      case '02n':
        return "url('../assets/02n.jpg')";
      case '03d':
        return "url('../assets/03d.jpg')";
      case '03n':
        return "url('../assets/03n.jpg')";
      case '04d':
        return "url('../assets/04d.jpg')";
      case '04n':
        return "url('../assets/04n.jpg')";
      case '09d':
        return "url('../assets/09d.jpg')";
      case '09n':
        return "url('../assets/09n.jpg')";
      case '10d':
        return "url('../assets/10d.jpg')";
      case '10n':
        return "url('../assets/10n.jpg')";
      case '11d':
        return "url('../assets/11d.jpg')";
      case '11n':
        return "url('../assets/11n.jpg')";
      case '13d':
        return "url('../assets/13d.jpg')";
      case '13n':
        return "url('../assets/13n.jpg')";
      case '50d':
        return "url('../assets/50d.jpg')";
      case '50n':
        return "url('../assets/50n.jpg')";
      default: 
        return "url('../assets/sunset.jpg')";
    }
  }
}
