import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/CountryResponse.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  country!: Country;
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.getOneCountry(id)),
        /**Recibe un observable, retorna un observable nuevo con información */
        tap(console.log)
        /**El tap dispara una acción secundaria */
      )
      .subscribe((resp) => {
        this.country = resp;
      });

    /**Segunda forma de usar el ActivatedRoute */
    // this.activatedRoute.params.subscribe(({ id }) => {
    //   //activatedRoute.params obtiene el parámetro de la peticion
    //   // ({id}) es una desestructuracion
    //   this.paisService.getOneCountry(id).subscribe((resp) => {
    //     console.log(resp);
    //   });
    // });
  }
}
