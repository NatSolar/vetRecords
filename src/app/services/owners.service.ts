import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Owner } from '../interfaces/owner'; 

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private readonly API_URL: string = environment.API_URL
  private readonly API_KEY: string = environment.API_KEY

  constructor(private http: HttpClient) { }

  getAll(): Observable<Owner[]>{
    return this.http.get<Owner[]>(`${this.API_URL}/owners?select=*`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  getById(id: number) : Observable<Owner[]> {
    return this.http.get<Owner[]>(`${this.API_URL}/owners?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  addOwner(owner:Owner): Observable<Owner> {
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(owner)
    return this.http.post<Owner>(`${this.API_URL}/owners`, body, {'headers': headers})
  }

  updateOwner(owner:Owner, id: number):Observable<void>{
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(owner)
    return this.http.patch<void>(`${this.API_URL}/owners?id=eq.${id}`, body, {'headers': headers})
  }

  deleteOwner(id:number){
    return this.http.delete<void>(`${this.API_URL}/owners?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

}