import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VocationalTestService } from '../../../services/vocational-test.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {

  preguntaForm: FormGroup;
  respuestaForm: FormGroup;
  imageURL: string;

  preguntas: any [] = [];

  id: string;

  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  @ViewChild('templatechild', { static: false }) templatechild: TemplateRef<any>;

  modalRef: BsModalRef;
  config = {
    // keyboard: false,
    class: 'modal-md',
    // ignoreBackdropClick: true
  };

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private vcService: VocationalTestService
  ) {
    this.preguntaForm = this.fb.group({
      pregunta: ['', Validators.required],
      img: ['', Validators.required]
    });

    this.respuestaForm = this.fb.group({
      rpta: [''],
      puntos: ['']
    });
   }

  ngOnInit(): void {
    this.cargarPreguntas();
    
  }

  get f() { return this.preguntaForm.controls; }
   // Image Preview
  showPreview(event) {
    // const formData: any = new FormData();
    const file = (event.target as HTMLInputElement).files[0];
    this.preguntaForm.patchValue({
      img: file
    });
    this.preguntaForm.get('img').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)

  }

  openModal() {
    this.preguntaForm.reset();
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  openChildModal(event) {
    console.log(event.id);
    this.id = event.id;
    this.respuestaForm.reset();
    this.modalRef = this.modalService.show(this.templatechild, this.config);
  }

  cargarPreguntas() {
    this.vcService.cargarPreguntas().subscribe((resp: any) => {
      this.preguntas = resp.preguntas;
      console.log(resp);
    })
  }

  crearPregunta() {
    console.log(this.preguntaForm.value);
    this.vcService.crearPregunta(this.preguntaForm.value).subscribe(resp => {
      console.log(resp);
      this.cargarPreguntas();
    })
  }

  crearRespuesta(){
    console.log(this.id,this.respuestaForm.value);
    this.vcService.actualizarPregunta(this.id, this.respuestaForm.value).subscribe(resp => {
      console.log(resp);
      this.cargarPreguntas();
    });
  }

  cancelar() {
    this.modalRef.hide();
  }

}
