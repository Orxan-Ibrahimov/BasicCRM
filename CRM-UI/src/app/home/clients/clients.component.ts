import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/client';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [ClientsService],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {

  constructor(private clientsService:ClientsService){}
  clients:Client[] = [];
  ngOnInit(): void {
   this.clientsService.get().subscribe((data:Client[])=> {
     this.clients = data;    
   });
  }


}
