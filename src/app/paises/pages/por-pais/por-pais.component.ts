import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/CountryResponse.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  notFound: boolean = false;
  showSuggestions: boolean = false;
  countriesFound: Country[] = [];
  countrySuggested: Country[] = [];

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.notFound = false;
    this.showSuggestions = true;
    this.termino = termino;
    this.paisService.searchCountry(termino).subscribe(
      (countries) => {
        this.countriesFound = countries;
      },
      (err) => {
        this.notFound = true;
        this.countriesFound = [];
      }
    );
  }

  sugerencias(termino: string) {
    this.notFound = false;
    this.termino = termino;
    this.showSuggestions = true;
    this.paisService.searchCountry(termino).subscribe(
      (countryResp) => {
        this.countrySuggested = countryResp.splice(0, 3);
      },
      (err) => (this.countrySuggested = [])
    );
  }
}
