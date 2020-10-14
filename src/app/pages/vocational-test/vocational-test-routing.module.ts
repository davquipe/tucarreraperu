import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VocationalTestComponent } from './vocational-test.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path:'test-vocacional',
    component: VocationalTestComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VocationalTestRoutingModule { }
