import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VocationalTestRoutingModule } from './vocational-test-routing.module';
import { VocationalTestComponent } from './vocational-test.component';


@NgModule({
  declarations: [VocationalTestComponent],
  imports: [
    CommonModule,
    VocationalTestRoutingModule
  ]
})
export class VocationalTestModule { }
