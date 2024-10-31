import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  ApiUrl = 'http://localhost:3000/api/vi/' + 'clients';
  
  constructor(private http:HttpClient) { }

  get():Observable<Client[]>{
   return this.http.get<Client[]>(`${this.ApiUrl}`,)
  }
}
