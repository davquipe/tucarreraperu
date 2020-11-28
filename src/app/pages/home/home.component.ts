import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from "@angular/common/http";
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  carrera: any = [];
  dCarrera: any = {};
  constructor(
    private modalService: BsModalService,
    private httpClient: HttpClient,
    private $gaService: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
    this.httpClient.get("../../../assets/json/home.json").subscribe(home =>{
      this.carrera = home;
    })
  }

  openModal(template: TemplateRef<any>, c) {
    console.log(c);
    this.$gaService.event(c.carreras, 'carreras_profesionales', 'Datos');
    this.dCarrera = c;
    this.modalRef = this.modalService.show(template);
  }

}
