import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import { AuthService } from './auth.service';
import { SavingsAccountService } from './savings-account.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [AuthService, SavingsAccountService],
})
export class ServicesIndexModule {}
