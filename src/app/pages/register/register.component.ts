import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
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
      if (resp['ok'] === true) {
        localStorage.clear();
        localStorage.setItem('participante', JSON.stringify(resp['usuario']));
        this.router.navigate(['/test-vocacional']);
      }
      console.log(resp);
    })
  }

  get f() { return this.registroForm.controls; }

}
