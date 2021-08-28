import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialAppModule } from '../material/material.module';

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule, HttpClientModule, MaterialAppModule, NgbModule],
  providers: [],
})
export class ComponentsModule {}
