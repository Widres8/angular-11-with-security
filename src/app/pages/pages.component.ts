import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  user: User = Object.assign({});

  constructor(private authService: AuthService, private router: Router) {
    this.authService.userSubjectObservable.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
