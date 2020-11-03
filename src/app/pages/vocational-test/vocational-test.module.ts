import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VocationalTestRoutingModule } from './vocational-test-routing.module';
import { VocationalTestComponent } from './vocational-test.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [VocationalTestComponent],
  imports: [
    CommonModule,
    VocationalTestRoutingModule,
    ProgressbarModule,
    FormsModule
  ]
})
export class VocationalTestModule { }
