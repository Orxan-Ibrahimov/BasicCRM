import { Component, OnInit } from '@angular/core';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
   me:User | null | undefined;
constructor(private tokenStorage:LocaleStorageService) {}
  ngOnInit(): void {
    this.tokenStorage.me().subscribe((user:User | null) => {
      this.me = user;      
    });
  }

}
