import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../models/client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss'], // Fixed typo
})
export class ClientViewComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientsService: ClientsService
  ) {}
  client_id: string = '';
  client: Client | null = null;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.client_id = params['cid'];
      console.log('Client ID (cid):', this.client_id);
    });

    this.clientsService
      .getClientById(this.client_id)
      .subscribe((client: Client | null) => {
        this.client = client;
      });
  }


}
