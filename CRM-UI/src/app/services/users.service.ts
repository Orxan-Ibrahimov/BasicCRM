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
export class UsersService {
  constructor(
    private http: HttpClient
  ) {}

  private userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );
  data$: Observable<User[]> = this.userSubject.asObservable();

  updateData(new_user: User[]) {
    this.userSubject.next(new_user);
  }

  ApiUrl = 'http://localhost:3000/api/vi/' + 'users';

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.ApiUrl}/${userId}`);
  }
}
