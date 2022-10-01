import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from '../interfaces/record';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private baseUrl: string = 'https://6319fd416b4c78d91b49bf32.mockapi.io' //API creada en mockAPI

  constructor(private http: HttpClient) { }
  
  getAll() : Observable<Record[]> {
    const url = `${this.baseUrl}/records`
    return this.http.get<Record[]>(url)
  }
  
  addRecord(record:Record): Observable<Record> {
    const url = `${this.baseUrl}/records`
    return this.http.post<Record>(url, record)
  }

}