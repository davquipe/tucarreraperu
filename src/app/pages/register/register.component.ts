import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { VocationalTestService } from '../../services/vocational-test.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailPattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

  registroForm: FormGroup

  constructor( 
    private vcService: VocationalTestService,
    private fb: FormBuilder,
    private router: Router,
    private $gaService: GoogleAnalyticsService
  ) { 
    this.registroForm = this.fb.group({
      nombres: ['', Validators.required],
      email: ['', Validators.required],
      celular: [''],
      colegio: [''],
      localidad: ['']
    })
}

  ngOnInit(): void {
  }

  post() {
    console.log(this.registroForm.value);
    this.vcService.crearParticipante(this.registroForm.value).subscribe(resp => {
      this.$gaService.event('enter_registro', 'usuario_formulario', 'Datos');
      if (resp['ok'] === true) {
        localStorage.clear();
        localStorage.setItem('participante', JSON.stringify(resp['usuario']));
        this.router.navigate(['/test-vocacional'], {queryParams: {page: 1}});
      }
      console.log(resp);
    })
  }

  get f() { return this.registroForm.controls; }

}
