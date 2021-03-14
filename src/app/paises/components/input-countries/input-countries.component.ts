import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-input-countries',
  templateUrl: './input-countries.component.html',
  styles: [],
})
export class InputCountriesComponent implements OnInit {
  @Input() placeholder: string = '';
  termino: string = '';
  debouncer: Subject<string> = new Subject();

  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  //Inicio del Debouncer
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  /**El debounceTime recibe el tiempo en ms que debe esperar para llevar a cabo el
   * siguiente metodo.
   *
   * El Debouncer con el tipo Subject suele ser como un tipo Observer, por lo cual
   * tendremos a disposicion distintos metodos propios del Observer
   */
  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)).subscribe((valor) => {
      this.onDebounce.emit(valor);
    });
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

  //Fin del Debouncer
  buscar() {
    this.onEnter.emit(this.termino);
  }
}
