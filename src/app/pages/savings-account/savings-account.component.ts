import { Component, OnInit } from '@angular/core';

import { SavingsAccountService } from '../../services/savings-account.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

import { User, SavingsAccount } from 'src/app/models/models';

@Component({
  selector: 'app-savings-account',
  templateUrl: './savings-account.component.html',
  styleUrls: ['./savings-account.component.scss'],
})
export class SavingsAccountComponent implements OnInit {
  account: SavingsAccount = Object.assign({});
  existAccount: boolean = false;
  showForm: boolean = false;
  currentBalance: number = 0;
  total: number = 0;
  addBalance: boolean = false;
  removeBalance: boolean = false;

  user: User = Object.assign({});

  constructor(
    private service: SavingsAccountService,
    private authService: AuthService
  ) {
    this.authService.userSubjectObservable.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(): void {
    this.service.getUserId(this.authService.user.id).subscribe((res) => {
      this.existAccount = res.success;
      if (res.success) {
        this.account = res.payload;
      }
    });
  }

  form(): void {
    this.showForm = true;
  }

  addBalanceShow(): void {
    this.total = 0;
    this.addBalance = true;
    this.removeBalance = false;
  }

  removeBalanceShow(): void {
    this.total = 0;
    this.removeBalance = true;
    this.addBalance = false;
  }

  create(): void {
    this.service.post(this.currentBalance, this.authService.user.id).subscribe(
      (res) => {
        if (res.success) {
          this.showForm = false;

          Swal.fire({
            icon: 'success',
            title: res.status,
            text: `Cuenta No: ${res.payload.number} creada correctamente`,
          });
          this.getAccount();
        } else {
          Swal.fire({
            icon: 'error',
            title: res.status,
            text:
              typeof res.errors === 'string'
                ? res.errors.toString()
                : Object.entries(res.errors).join(','),
          });
        }
      },
      (res) => {
        Swal.fire({
          icon: 'error',
          title: res.error.status,
          text:
            typeof res.error.errors === 'string'
              ? res.error.errors.toString()
              : Object.entries(res.error.errors).join(','),
        });
      }
    );
  }

  updateBalance(): void {
    this.service
      .put(this.account.number, this.total, this.addBalance)
      .subscribe(
        (res) => {
          if (res.success) {
            this.total = 0;
            this.removeBalance = false;
            this.addBalance = false;

            Swal.fire({
              icon: 'success',
              title: res.status,
              text: `Cuenta No: ${res.payload.number}, transacción efectuada correctamente`,
            });
            this.getAccount();
          } else {
            Swal.fire({
              icon: 'error',
              title: res.status,
              text:
                typeof res.errors === 'string'
                  ? res.errors.toString()
                  : Object.entries(res.errors).join(','),
            });
          }
        },
        (res) => {
          Swal.fire({
            icon: 'error',
            title: res.error.status,
            text:
              typeof res.error.errors === 'string'
                ? res.error.errors.toString()
                : Object.entries(res.error.errors).join(','),
          });
        }
      );
  }
}
