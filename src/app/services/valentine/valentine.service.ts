import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValentineService {
  // REPLACE THIS with your actual MockApi URL
  private apiUrl = 'https://6816213c32debfe95dbd88b6.mockapi.io/MockApi';

  constructor(private http: HttpClient) { }

  sendResponse(response: string): Observable<any> {
    const payload = {
      response: response,
      timestamp: new Date().toISOString()
    };
    return this.http.post(this.apiUrl, payload);
  }
}
