import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/CountryResponse.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private baseEndPoint: string = 'https://restcountries.eu/rest/v2/';

  constructor(private httpParams: HttpClient) {}

  setParams() {
    return new HttpParams().set(
      'fields',
      'name;capital;alpha2Code;flag;population;numericCode;translations;alpha3Code'
    );
  }

  searchCountry(country: string): Observable<Country[]> {
    const queryURL = `${this.baseEndPoint}name/ ${country}`;
    return this.httpParams.get<Country[]>(queryURL, {
      params: this.setParams(),
    });
  }
  searchByCapital(capital: string): Observable<Country[]> {
    const queryURL = `${this.baseEndPoint}capital/${capital}`;
    return this.httpParams.get<Country[]>(queryURL, {
      params: this.setParams(),
    });
  }
  getOneCountry(id: string): Observable<Country> {
    const queryURL = `${this.baseEndPoint}alpha/${id}`;
    return this.httpParams.get<Country>(queryURL, {
      params: this.setParams(),
    });
  }
  getByRegion(region: string): Observable<Country[]> {
    const queryURL = `${this.baseEndPoint}region/${region}`;
    return this.httpParams
      .get<Country[]>(queryURL, { params: this.setParams() })
      .pipe(tap(console.log));
  }
}
