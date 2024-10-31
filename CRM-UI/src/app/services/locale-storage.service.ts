import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocaleStorageService {
  private me_subject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  me$: Observable<User | null> = this.me_subject.asObservable();
  private tokenName = 'token';

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
    this.me().subscribe((me) => {
      if (!me) {
        this.fetchUserData();
      }
    });
  }

  updateData(me: User) {
    this.me_subject.next(me);
  }

  private fetchUserData() {
    this.me$.subscribe((user) => {
      if(user)
      this.me_subject.next(user);
    });
  }

  getItem(): string | null {
    return localStorage.getItem(this.tokenName);
  }

  setItem(token: string): void {
    localStorage.setItem(this.tokenName, token);
  }

  me(): Observable<User | null> {
    const token = this.getItem();
    if (!token) {
      console.warn('No token found');
      return of(null);
    }
    const decodedToken = this.jwtService.decodeToken(token);
    if (!decodedToken?.userId) {
      console.warn('Invalid token format');
      return of(null);
    }
    return this.usersService.getUserById(decodedToken.userId);
  }

  removeItem(): void {
    localStorage.removeItem(this.tokenName);
  }
}
