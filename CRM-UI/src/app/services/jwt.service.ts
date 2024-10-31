import { Injectable } from '@angular/core';
import { Jwt } from '../models/jwt';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  decodeToken(token: string): Jwt | null {
    try {
      return jwtDecode<Jwt>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded = this.decodeToken(token);
    return decoded?.exp ? new Date(decoded.exp * 1000) : null;
  }

  isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    // Treat as expired if no expiration date is available
    return expirationDate ? expirationDate < new Date() : true;
  }
}
