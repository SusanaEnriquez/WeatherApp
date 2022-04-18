import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  URICurrent: string = "";
  URIForecast: string = "";
  
  apiKey = "";

  constructor(private http: HttpClient) {
    this.URICurrent = `http://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&q=`
    this.URIForecast = `https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly,alerts&appid=${this.apiKey}`
   }

   getWeather(cityName: string, unit: string){
    return this.http.get(`${this.URICurrent}${cityName}&units=${unit}`)
  }

  getForecast(lat: number, lon: number, unit: string){
    return this.http.get(`${this.URIForecast}&lat=${lat}&lon=${lon}&units=${unit}`)
  }


}
