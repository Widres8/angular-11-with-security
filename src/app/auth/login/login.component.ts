import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public service: AuthService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem(environment.tokenKey) != null) {
      this.router.navigate(['/inicio']);
    }
  }

  onSubmit() {
    this.spinner.show();
    this.service.login().subscribe(
      (res) => {
        this.spinner.hide();
        if (res.success) {
          this.router.navigate(['/inicio']);
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
        console.log(res);

        Swal.fire({
          icon: 'error',
          title: res.error.status,
          text:
            typeof res.error.errors === 'string'
              ? res.error.errors.toString()
              : Object.entries(res.error.errors).join(','),
        });
        this.spinner.hide();
      }
    );
  }
}
