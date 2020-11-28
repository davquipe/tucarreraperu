import { Component, OnInit } from '@angular/core';
import { VocationalTestService } from '../../services/vocational-test.service';

@Component({
  selector: 'app-vocational-test',
  templateUrl: './vocational-test.component.html',
  styleUrls: ['./vocational-test.component.scss']
})
export class VocationalTestComponent implements OnInit {

  public totalPreguntas: number = 0;
  public preguntas: any[]= [];

  public desde: number = 0;

  constructor(
    private vcService: VocationalTestService
  ) { }

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.vcService.cargarTests( this.desde ).subscribe((resp: any) => {
      this.preguntas = resp.preguntas;
      this.totalPreguntas = resp.total;
      // this.desde = 2;
      console.log(this.preguntas);
    })
  }

  verResultado( event: any) {
    var existing = localStorage.getItem('guardandoRespuesta');
    const id = event._id;
    console.log('gaaaaaaaaaaaaa',event);
    existing = existing ? existing.split(',') : [];
    existing.push(event);
    localStorage.setItem('guardandoRespuesta', existing.toString());
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalPreguntas ) {
      this.desde -= valor; 
    }
    this.cargarPreguntas();
  }


}
