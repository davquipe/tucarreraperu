import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [PreguntasComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule,
    TooltipModule.forRoot()
  ]
})
export class AdminModule { }
