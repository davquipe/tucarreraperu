import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VocationalTestComponent } from './vocational-test.component';

const routes: Routes = [
  {
    path:'test',
    component: VocationalTestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VocationalTestRoutingModule { }
