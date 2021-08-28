import { NgModule } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

// Pipes
import { CustomCurrencyPipe } from './custom-currency.pipe';

@NgModule({
  declarations: [CustomCurrencyPipe],
  exports: [CustomCurrencyPipe],
  providers: [CurrencyPipe, DatePipe, CustomCurrencyPipe],
})
export class PipesModule {}
