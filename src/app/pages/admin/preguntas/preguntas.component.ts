import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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
  carreras: any [] = [];
  pid: string;
  rid: string;

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
    private vcService: VocationalTestService,
    private library: FaIconLibrary
  ) {

    this.library.addIcons(faTimes);
    this.preguntaForm = this.fb.group({
      pregunta: ['', Validators.required],
      carrera: ['', Validators.required],
      // img: ['', Validators.required],
      id: ['']
    });

    this.respuestaForm = this.fb.group({
      rpta: [''],
      puntos: [''],
      _id: ['']
    });
   }

  ngOnInit(): void {
    this.cargarPreguntas();
    this.cargarCarreras();
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

  openModal( pregunta?: any ) {
    console.log(pregunta);
    
    if (pregunta) {
      // this.imageURL = pregunta.img;
      this.preguntaForm.patchValue(pregunta);
    } else {
      this.preguntaForm.reset();
    }
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  cargarPreguntas() {
    this.vcService.cargarPreguntas().subscribe((resp: any) => {
      this.preguntas = resp.preguntas;
      console.log(resp);
    })
  }

  crearPregunta() {
    console.log(this.preguntaForm.value);
    if (this.preguntaForm.value.id) {
      console.log('Actualizando');
      this.vcService.actualizarPregunta(this.preguntaForm.value).subscribe((resp: any) => {
        console.log(resp);
        if (resp.ok === true) {
          this.cargarPreguntas();
          this.modalRef.hide();
        }
      })
    } else {
      console.log('creando');
      console.log(this.preguntaForm.value);
      this.vcService.crearPregunta(this.preguntaForm.value).subscribe((resp: any) => {
        console.log(resp);
        if (resp.ok === true) {
          this.cargarPreguntas();
          this.modalRef.hide();
        }
      });
    }
  }

  borrarPregunta(pregunta: any) {
    console.log(pregunta);
    this.vcService.borrarPregunta(pregunta.id).subscribe(resp =>{
      console.log(resp);
      this.cargarPreguntas();
    })
  }

  
  /**
   * CRUD respuesta
   */

  openChildModal(pregunta: any, respuesta: any) {
    this.pid = pregunta.id;
    console.log(this.pid);
    
    if (respuesta) {
      this.respuestaForm.patchValue(respuesta);
    } else {
      this.respuestaForm.reset();
    }
    this.modalRef = this.modalService.show(this.templatechild, this.config);
  }


  crearRespuesta(){
    console.log(this.id,this.respuestaForm.value);
    const respuesta =  { pid: this.pid, ...this.respuestaForm.value};
    if (this.respuestaForm.value._id) {
      console.log('Actualizando');
      this.vcService.actualizarRespuesta(respuesta).subscribe((resp: any) =>{
        console.log(resp);
        if (resp.ok === true) {
          this.cargarPreguntas();
          this.modalRef.hide()
        }
      });
    } else {
      console.log('creando nuevo');
      this.vcService.crearRespuesta(this.pid, this.respuestaForm.value).subscribe((resp: any) => {
        console.log(resp);
        if (resp.ok === true) {
          this.cargarPreguntas();
          this.modalRef.hide()
        }
      });
    }
  }

  cancelar() {
    this.modalRef.hide();
  }

  borrarRespuesta(pregunta: any, respuesta: any) {
    console.log(pregunta);
    console.log(respuesta)
    this.vcService.borrarRespuesta(pregunta.id, respuesta._id).subscribe(resp => {
      console.log(resp);
      this.cargarPreguntas();
    })
  }


  /**
   * Cargar carreras
   */

  cargarCarreras() {
    this.vcService.cargarCarreras().subscribe((resp: any) => {
      console.log('gaaaaaaaaaaaaa',resp);
      this.carreras = resp.carreras;
    })
  }

  

}
