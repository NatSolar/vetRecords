import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Deworming } from '../interfaces/deworning';
import { InjectableMed } from '../interfaces/injectable';
import { Observation } from '../interfaces/observations';
import { PhysicalExam } from '../interfaces/physicalExam';
import { Exam } from '../interfaces/exam';
import { Vaccines } from '../interfaces/vaccines';

@Injectable({
  providedIn: 'root'
})
export class GeneralDataService {

  private readonly API_URL: string = environment.API_URL
  private readonly API_KEY: string = environment.API_KEY

  constructor(private http: HttpClient) { }

  /* Injectables */

  getInjectableById(id: number) : Observable<InjectableMed[]> {
    return this.http.get<InjectableMed[]>(`${this.API_URL}/injectables?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  getInjectableByRecordId(id: number) : Observable<InjectableMed[]> {
    return this.http.get<InjectableMed[]>(`${this.API_URL}/injectables?recordId=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  addInjectableMed(injectable:InjectableMed): Observable<InjectableMed> {
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(injectable)
    return this.http.post<InjectableMed>(`${this.API_URL}/injectables`, body, {'headers': headers})
  }

  updateInjectableMed(deworming:InjectableMed, id: number):Observable<void>{
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(deworming)
    return this.http.patch<void>(`${this.API_URL}/injectables?id=eq.${id}`, body, {'headers': headers})
  }

  deleteInjectableMed(id:number){
    return this.http.delete<void>(`${this.API_URL}/injectables?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  /* Dewormings */

  getDewormingById(id: number) : Observable<Deworming[]> {
    return this.http.get<Deworming[]>(`${this.API_URL}/dewormings?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  getDewormingByRecordId(id: number) : Observable<Deworming[]> {
    return this.http.get<Deworming[]>(`${this.API_URL}/dewormings?recordId=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  addDeworming(deworming:Deworming): Observable<Deworming> {
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(deworming)
    return this.http.post<Deworming>(`${this.API_URL}/dewormings`, body, {'headers': headers})
  }

  updateDeworming(deworming:Deworming, id: number):Observable<void>{
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(deworming)
    return this.http.patch<void>(`${this.API_URL}/dewormings?id=eq.${id}`, body, {'headers': headers})
  }

  deleteDeworming(id:number){
    return this.http.delete<void>(`${this.API_URL}/dewormings?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  /* Observations */

  getObservationById(id: number) : Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.API_URL}/observations?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  getObservationByRecordId(id: number) : Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.API_URL}/observations?recordId=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  addObservation(observation:Observation): Observable<Observation> {
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(observation)
    return this.http.post<Observation>(`${this.API_URL}/observations`, body, {'headers': headers})
  }

  updateObservation(observation:Observation, id: number):Observable<void>{
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(observation)
    return this.http.patch<void>(`${this.API_URL}/observations?id=eq.${id}`, body, {'headers': headers})
  }

  deleteObservation(id:number){
    return this.http.delete<void>(`${this.API_URL}/observations?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  /* PhysicalExams */

  getPhysicalById(id: number) : Observable<PhysicalExam[]> {
    return this.http.get<PhysicalExam[]>(`${this.API_URL}/physicalExams?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  getPhysicalByRecordId(id: number) : Observable<PhysicalExam[]> {
    return this.http.get<PhysicalExam[]>(`${this.API_URL}/physicalExams?recordId=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  addPhysical(physicalExam:PhysicalExam): Observable<PhysicalExam> {
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(physicalExam)
    return this.http.post<PhysicalExam>(`${this.API_URL}/physicalExams`, body, {'headers': headers})
  }

  updatePhysical(physicalExam:PhysicalExam, id: number):Observable<void>{
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(physicalExam)
    return this.http.patch<void>(`${this.API_URL}/physicalExams?id=eq.${id}`, body, {'headers': headers})
  }

  deletePhysical(id:number){
    return this.http.delete<void>(`${this.API_URL}/physicalExams?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  /* Specific Exams */

  getExamById(id: number) : Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.API_URL}/exams?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  getExamByRecordId(id: number) : Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.API_URL}/exams?recordId=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  addExam(exam:Exam): Observable<Exam> {
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(exam)
    return this.http.post<Exam>(`${this.API_URL}/exams`, body, {'headers': headers})
  }

  updateExam(exam:Exam, id: number):Observable<void>{
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(exam)
    return this.http.patch<void>(`${this.API_URL}/exams?id=eq.${id}`, body, {'headers': headers})
  }

  deleteExam(id:number){
    return this.http.delete<void>(`${this.API_URL}/exams?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  /* Vaccines */

  addVaccine(vaccine:Vaccines): Observable<Vaccines> {
    const headers = { 'apiKey': this.API_KEY, 'content-type': 'application/json'}
    const body = JSON.stringify(vaccine)
    return this.http.post<Vaccines>(`${this.API_URL}/vaccines`, body, {'headers': headers})
  }

  getVaccinesByRecordId(id: number) : Observable<Vaccines[]> {
    return this.http.get<Vaccines[]>(`${this.API_URL}/vaccines?petId=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

  deleteVaccine(id:number){
    return this.http.delete<void>(`${this.API_URL}/vaccines?id=eq.${id}`, {
      headers: {
        'apiKey': this.API_KEY
      }
    })
  }

}