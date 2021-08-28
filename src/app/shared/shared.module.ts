import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialAppModule } from './material/material.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,

    DirectivesModule,
    MaterialAppModule,
    PipesModule,
    ComponentsModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,

    DirectivesModule,
    MaterialAppModule,
    PipesModule,
    ComponentsModule,
  ],
})
export class SharedModule {}
