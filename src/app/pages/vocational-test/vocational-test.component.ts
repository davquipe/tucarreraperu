import { Component, OnInit } from '@angular/core';
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
      console.log('GAAAAAAAAAAA',Math.round(12.16666666666667) + 1);
    })
  }

  verResultado( event: any) {
    // let existing = localStorage.getItem('guardandoRespuesta');
    // const id = event._id;
    // existing = existing ? existing.split(',') : [];
    // existing.push(event);
    // localStorage.setItem('guardandoRespuesta', existing.toString());
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


}
