import { Component, Input } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/CountryResponse.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [],
})
export class PorCapitalComponent {
  termino: string = '';
  notFound: boolean = false;
  capitalFound: Country[] = [];
  constructor(private paisService: PaisService) {}

  buscar(capital: string) {
    this.capitalFound = [];
    this.notFound = false;
    this.termino = capital;
    this.paisService.searchByCapital(capital).subscribe(
      (capital) => {
        this.capitalFound = capital;
      },
      (err) => {
        this.notFound = true;
        this.capitalFound = [];
      }
    );
  }
}
