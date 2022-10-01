import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../interfaces/owner'; 

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

private baseUrl: string = 'https://6319fd416b4c78d91b49bf32.mockapi.io' //API creada en mockAPI

  constructor(private http: HttpClient) { }

  getAll() : Observable<Owner[]> {
    const url = `${this.baseUrl}/owners`
    return this.http.get<Owner[]>(url)
  }

  getById(id: number) : Observable<Owner> {
    const url = `${this.baseUrl}/owners/${id}`
    return this.http.get<Owner>(url)
  }

  addOwner(owner:Owner): Observable<Owner> {
    const url = `${this.baseUrl}/owners`
    return this.http.post<Owner>(url, owner)
  }

  updateOwner(owner:Owner, id: number):Observable<void>{
    const url = `${this.baseUrl}/owners/${id}`
    return this.http.put<void>(url, owner)
  }

  deleteOwner(id:number){
    const url = `${this.baseUrl}/owners/${id}`
    return this.http.delete<void>(url)
  }

}