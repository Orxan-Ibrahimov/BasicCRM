import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/client';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet ,RouterLink],
  providers: [ClientsService],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {

  constructor(private clientsService:ClientsService, 
    private router:Router
  ){}
  clients:Client[] = [];
  ngOnInit(): void {
    this.clientsService.get().subscribe(clients => {
      this.clients = clients;
     });
  }
  RemoveClient(data: Client | null) {
    if (data)
      this.clientsService.removeClientById(data.id).subscribe((data) => {
        this.clientsService.get().subscribe(clients => {
          this.clients = clients;
         });
        this.clientsService.updateData(null);
        this.router.navigate(['home/clients']);
      });   
  }

}
