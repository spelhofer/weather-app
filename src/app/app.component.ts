import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import cities from 'cities.json';
import * as cities from 'cities.json';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    private appId: string;
    private appCode: string;
    public geocoder: any;
    public weather: any;
    public city: any;

    public constructor(private http: HttpClient) {
        this.appId = "OnWpa1idVKTh0Q24NHJG";
        this.appCode = "xrF7M2a5nJ23NY-Yvq3uxQ";
        this.weather = [];
        this.city = '';
    }

    public getCity(){
        // let inputFields = (<HTMLInputElement>event.target).value
        // this.city = document.getElementsByClassName('getCityName')[0].value;
        this.geocoder = cities['default'].filter(el => el.name === 'Lviv');
        console.log()
        this.getWeather();
    }

    public getWeather() {
        this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + this.geocoder[0].lat + "&longitude=" + this.geocoder[0].lng + "&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
        .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
        .subscribe(result => {
            this.weather = result.forecast;
        }, error => {
            console.error(error);
        });
    }

}