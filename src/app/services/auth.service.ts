import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Token, User, Auth, ResponseApi } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey: string = environment.tokenKey;
  private userKey: string = environment.userKey;

  // Attributes
  token: Token;
  user: User;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private userSubject = new BehaviorSubject<User>(Object.assign({}));
  public userSubjectObservable = this.userSubject.asObservable();

  // Forms
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      // Validators.pattern(
      //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
      // ),
    ]),
  });

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.token = { access_token: '', expires_in: 0, token_type: '' };
    this.user = Object.assign({});
    this.loadStorage();
  }

  login(): Observable<ResponseApi> {
    const form: Auth = Object.assign({}, this.loginForm.value);
    return this.http.post(`${environment.urlApi}/auth`, form).pipe(
      map((result: any) => {
        if (result.success) {
          const payload = JSON.parse(atob(result.payload.jwt.split('.')[1]));
          const token: Token = {
            access_token: result.payload.jwt,
            token_type: 'Bearer',
            expires_in: payload.exp,
          };
          this.saveStorage(token, result.payload.user);
        }
        return result as ResponseApi;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  profile(): Observable<void> {
    return this.http.post(`${environment.urlApi}/user`, {}).pipe(
      map((result: any) => {
        if (result.success) {
          this.saveStorage(this.token, result.data);
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  logout(): void {
    this.token = { access_token: '', expires_in: 0, token_type: '' };
    this.user = Object.assign({});
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(Object.assign({}));
  }

  saveStorage(token: Token, user: User): void {
    this.isAuthenticatedSubject.next(true);
    this.userSubject.next(user);
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  isLoginUser(): boolean {
    return this.token.access_token.length > 5 ? true : false;
  }

  loadStorage(): void {
    if (localStorage.getItem(this.tokenKey)) {
      this.token = JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
      this.user = JSON.parse(localStorage.getItem(this.userKey) || '{}');
      this.isAuthenticatedSubject.next(true);
      this.userSubject.next(this.user);
    } else {
      this.token = { access_token: '', expires_in: 0, token_type: '' };
      this.user = Object.assign({});
      this.isAuthenticatedSubject.next(false);
      this.userSubject.next(Object.assign({}));
    }
  }

  initializeLoginForm(): void {
    this.loginForm.setValue({
      email: '',
      password: '',
    });
  }

  rolesMatch(roles: string[]): boolean {
    let isMatch = false;
    roles.forEach((element) => {
      isMatch =
        this.user.roles.filter(
          (x) => x.name?.toLowerCase() == element.toLowerCase()
        ).length > 0
          ? true
          : false;
    });
    return isMatch;
  }
}
