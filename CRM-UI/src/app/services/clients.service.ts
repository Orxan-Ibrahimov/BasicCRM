import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  ApiUrl = 'http://localhost:3000/api/vi/' + 'clients';

  private clientSubject: BehaviorSubject<Client | null> =
    new BehaviorSubject<Client | null>(null);
  data$: Observable<Client | null> = this.clientSubject.asObservable();

  updateData(new_client: Client | null) {
    this.clientSubject.next(new_client);
  }

  constructor(private http: HttpClient) {}

  get(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.ApiUrl}`);
  }

  getClientById(cid: string): Observable<Client> {
    return this.http.get<Client>(`${this.ApiUrl}/${cid}`);
  }

  addClient(organization: string, person:string, phone:string, address:string): Observable<Client> {
    return this.http.post<Client>(this.ApiUrl, {organization, person, phone, address});
  }

  removeClientById(cid: string): Observable<Client> {
    return this.http.delete<Client>(`${this.ApiUrl}/${cid}`);
  }
}
