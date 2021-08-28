import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IsAuthDirective } from './is-auth.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IsAuthDirective],
  exports: [IsAuthDirective],
})
export class DirectivesModule {}
