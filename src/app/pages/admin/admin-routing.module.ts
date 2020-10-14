import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreguntasComponent } from './preguntas/preguntas.component';

const routes: Routes = [
  {
    path:'preguntas',
    component: PreguntasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
