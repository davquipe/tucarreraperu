import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VocationalTestService } from '../../services/vocational-test.service';

@Component({
  selector: 'app-vocational-test',
  templateUrl: './vocational-test.component.html',
  styleUrls: ['./vocational-test.component.scss']
})
export class VocationalTestComponent implements OnInit {

  public totalPreguntas: number = 0;
  public preguntas: any[]= [];
  public page: number;
  public pageSize: number;
  public activebtn: boolean = true;
  respuestas: any [] = [];

  constructor(
    private vcService: VocationalTestService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) { 
    this.activeRouter.queryParamMap.subscribe((params: any) => {
      const { page } = params.params;
      this.page = Number(page);
      this.cargarPreguntas(page);
    });
  }

  ngOnInit(): void {
  }

  cargarPreguntas(page: number) {
    this.vcService.cargarTests(page).subscribe((resp: any) => {
      this.preguntas = resp.preguntas;
      this.totalPreguntas = resp.total;
      this.pageSize = resp.pageSize;
      if ( this.totalPreguntas < (this.page * this.pageSize)) this.activebtn = false;
    })
  }

  seleccionar( p: any, r: any) {
      const data = { id: p.id, carrera:  p.carrera,  pregunta: p.pregunta, respuesta: r.rpta, puntaje: r.puntos }
      this.respuestas.some((temp,i) => {
        if (temp.id == p.id) this.respuestas.splice(i,1);
      }) || this.respuestas.push(data);

      localStorage.setItem('respuestas', JSON.stringify(this.respuestas));
      console.log(this.respuestas);
    
  }

  atras(atras: number) {
    this.activebtn = true;
    this.page += atras;
    this.router.navigate(['/test-vocacional'], {queryParams: {page: this.page}});
    if ( this.page < 1 ) {
      this.page = 1;
      this.router.navigate(['/test-vocacional'], {queryParams: {page: 1}});
    } 
  }

  siguiente(sgte: number) {
    this.page += sgte;
    this.router.navigate(['/test-vocacional'], {queryParams: {page: this.page}});
    if ((this.page - 1) * this.pageSize >= this.totalPreguntas) {
      this.page -= sgte; 
      this.router.navigate(['/test-vocacional'], {queryParams: {page: this.page}});
    } else if ( this.totalPreguntas < (this.page * this.pageSize)) {
      this.activebtn = false;
    }
  }

  finalizar() {
    // this.respuestas.map(respuesta => {
    //   // this.vcService.guardarRespuesta(respuesta).su
    // });
  }


  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
    event.preventDefault();
    event.returnValue = false;
  }



}
