/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';
import { LocaleStorageService } from './locale-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocaleStorageService,
    private router: Router
  ) {}

  ApiUrl = 'http://localhost:3000/api/vi/' + 'users';

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.ApiUrl}/login`, { email, password });
  }

  logout() {
    this.localStorageService.removeItem();
    this.router.navigate(['/auth/login']);
  }

  register(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http.post<User>(`${this.ApiUrl}/register`, {
      name,
      surname,
      email,
      password,
    });
  }
}
