import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private readonly API_URL: string = environment.API_URL
  private readonly API_KEY: string = environment.API_KEY

  constructor(private http: HttpClient) { }

  getAll(): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.API_URL}/appointments?select=*`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  getById(id: number) : Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.API_URL}/appointments?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  getByRecordId(id: number) : Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.API_URL}/appointments?recordId=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  getByOwnerId(id: number) : Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.API_URL}/appointments?ownerId=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  addOwner(appointment:Appointment): Observable<Appointment> {
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(appointment)
    return this.http.post<Appointment>(`${this.API_URL}/appointments`, body, {'headers': headers})
  }

  updateOwner(appointment:Appointment, id: number):Observable<void>{
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(appointment)
    return this.http.patch<void>(`${this.API_URL}/appointments?id=eq.${id}`, body, {'headers': headers})
  }

  deleteOwner(id:number){
    return this.http.delete<void>(`${this.API_URL}/appointments?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

}