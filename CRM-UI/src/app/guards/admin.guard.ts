// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Example service for user roles
import { UsersService } from '../services/users.service';
import { LocaleStorageService } from '../services/locale-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private tokenStorageService: LocaleStorageService,
     private router: Router) {}

  canActivate(): any {
    this.tokenStorageService.me().subscribe((data) => {
      if (data)
        this.usersService.getUserById(data?.id).subscribe((user) => {         
          if (user && user.role === 'admin') {
            return true;
          } else {
            alert('Only admins can access this page.');
            this.router.navigate(['/home']); // Redirect to a safe route if not admin
            return false;
          }
        });        
    });   
  }
}
