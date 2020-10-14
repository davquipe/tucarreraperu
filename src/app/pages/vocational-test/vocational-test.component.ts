import { Component, OnInit } from '@angular/core';
import { VocationalTestService } from '../../services/vocational-test.service';

@Component({
  selector: 'app-vocational-test',
  templateUrl: './vocational-test.component.html',
  styleUrls: ['./vocational-test.component.scss']
})
export class VocationalTestComponent implements OnInit {

  preguntas: any[]= [];

  constructor(
    private vcService: VocationalTestService
  ) { }

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.vcService.cargarPreguntas().subscribe((resp: any) => {
      this.preguntas = resp.preguntas;
      console.log(this.preguntas);
    })
  }

  verResultado( event: any) {
    console.log('gaaaaaaaaaaaaa',event);
  }

}
