import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  carrera: any = [];
  constructor(
    private modalService: BsModalService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.httpClient.get("../../../assets/json/home.json").subscribe(home =>{
      console.log(home);
      this.carrera = home;
      
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
