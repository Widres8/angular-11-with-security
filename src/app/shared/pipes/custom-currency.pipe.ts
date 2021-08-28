import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}
  transform(value: any): string {
    const currencyCode = 'COP';
    let result = this.currencyPipe.transform(value != null ? value : 0);
    result += ` ${currencyCode}`;
    return result ?? '';
  }
}
