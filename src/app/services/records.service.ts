import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap, of, zip, tap, from, map, toArray, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Record } from '../interfaces/record';
import { Owner } from '../interfaces/owner';
import { OwnerService } from './owners.service';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private readonly API_URL: string = environment.API_URL
  private readonly API_KEY: string = environment.API_KEY

  constructor(private http: HttpClient, private readonly ownersService: OwnerService) { }
  
  getAll() : Observable<Record[]> {
    return this.http.get<Record[]>(`${this.API_URL}/records?select=*`, {
      headers: {
        'apiKey': this.API_KEY
      }
    }).pipe(
      mergeMap(records => forkJoin(
        records.map(o => this.ownersService.getById(o.ownerId).pipe(
          map(ownerInfo => {
            let fullName = ownerInfo[0].firstname + " " + ownerInfo[0].lastnameF + " " + ownerInfo[0].lastnameM;
            o.ownerNm = fullName;
            return o;
          })
        ))
      )),
      //tap(console.log)
    )
  }
  
  getById(id: number) : Observable<Record[]> {
    return this.http.get<Record[]>(`${this.API_URL}/records?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  addRecord(owner:Record): Observable<Record> {
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(owner)
    return this.http.post<Record>(`${this.API_URL}/records`, body, {'headers': headers})
  }

  updateRecord(owner:Record, id: number):Observable<void>{
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(owner)
    return this.http.patch<void>(`${this.API_URL}/records?id=eq.${id}`, body, {'headers': headers})
  }

  deleteRecord(id:number){
    return this.http.delete<void>(`${this.API_URL}/records?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  getAllPetsByOwnerId(ownerId: number): Observable<Record[]> {
    return this.http.get<Record[]>(`${this.API_URL}/records?ownerId=eq.${ownerId}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

}