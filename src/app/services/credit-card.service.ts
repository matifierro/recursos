import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  
  private apiUrl: string = 'http://localhost:3000/creditCards';
  
  constructor(private http : HttpClient) { }


getCreditCard(): Observable<CreditCard[]>{
  return this.http.get<CreditCard[]>(this.apiUrl)
}
}
