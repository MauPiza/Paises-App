import { Component, Output, Input } from '@angular/core';
import { Country } from '../../interfaces/CountryResponse.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class PorRegionComponent {
  regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  countriesOfRegions: Country[] = [];

  countrySelected: string = '';
  constructor(private paisService: PaisService) {}

  setClass(region: string): string {
    return this.countrySelected === region
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }
  searchRegion(region: string) {
    if (region === this.countrySelected) return;

    this.countrySelected = region;
    this.countriesOfRegions = [];
    this.paisService.getByRegion(region).subscribe(
      (regionResp) => {
        this.countriesOfRegions = regionResp;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
