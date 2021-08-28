import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

import { ResponseApi } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SavingsAccountService {
  // Paths
  private path: string = '/v1/accounts';

  constructor(
    private http: HttpClient,
    public router: Router,
    public authService: AuthService
  ) {}

  getUserId(id: number): Observable<ResponseApi> {
    return this.http.get(`${environment.urlApi}${this.path}/user/${id}`).pipe(
      map((result) => result as ResponseApi),
      catchError((error) => throwError(error))
    );
  }

  getAccountNumber(accountNumber: string): Observable<ResponseApi> {
    return this.http
      .get(`${environment.urlApi}${this.path}/account-number/${accountNumber}`)
      .pipe(
        map((result) => result as ResponseApi),
        catchError((error) => throwError(error))
      );
  }

  post(currentBalance: number, userId: number): Observable<ResponseApi> {
    const body = {
      lastBalance: 0,
      number: Math.floor(
        Math.random() * (9999999999 - 1234567891 + 1) + 1234567891
      ),
      userId,
      currentBalance,
    };
    return this.http.post(`${environment.urlApi}${this.path}`, body).pipe(
      map((result) => result as ResponseApi),
      catchError((error) => throwError(error))
    );
  }

  put(
    accountNumber: string,
    value: number,
    addBalance: boolean
  ): Observable<ResponseApi> {
    const body = {
      number: accountNumber,
      value,
      addBalance,
    };
    return this.http.put(`${environment.urlApi}${this.path}`, body).pipe(
      map((result) => result as ResponseApi),
      catchError((error) => throwError(error))
    );
  }

  delete(id: any): Observable<ResponseApi> {
    return this.http.delete(`${environment.urlApi}${this.path}/${id}`).pipe(
      map((result) => result as ResponseApi),
      catchError((error) => throwError(error))
    );
  }
}
