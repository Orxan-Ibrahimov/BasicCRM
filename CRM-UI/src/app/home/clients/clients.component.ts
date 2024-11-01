import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/client';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, RouterLink],
  providers: [ClientsService],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  constructor(
    private clientsService: ClientsService,
    private usersService: UsersService,
    private router: Router,
    private tokenStorageService: LocaleStorageService
  ) {}
  clients: Client[] = [];
  me: User | undefined;
  ngOnInit(): void {
    this.tokenStorageService.me().subscribe((data) => {
      if (data)
        this.usersService.getUserById(data?.id).subscribe((user) => {
          this.me = user;
          console.log(this.me.role);
        });
    });
    this.clientsService.get().subscribe((clients) => {
      this.clients = clients;
    });
  }
  RemoveClient(data: Client | null) {
    if (this.me?.role !== 'admin') {
      alert('Only admins can remove clients.');
      return;
    }
    // Perform deletion logic
    if (confirm('Are you sure you want to delete this client?')) {
      if (data)
        this.clientsService.removeClientById(data.id).subscribe((data) => {
          this.clientsService.get().subscribe((clients) => {
            this.clients = clients;
          });
          this.clientsService.updateData(null);
          this.router.navigate(['home/clients']);
        });
    }
  }
}
