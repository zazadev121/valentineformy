import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DateBooking {
  id?: string;
  DateIdea: string;
  DateTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private apiUrl = 'https://6816213c32debfe95dbd88b6.mockapi.io/Date';

  constructor(private http: HttpClient) {}

  // Get all date bookings
  getAllDates(): Observable<DateBooking[]> {
    return this.http.get<DateBooking[]>(this.apiUrl);
  }

  // Get a specific date booking
  getDate(id: string): Observable<DateBooking> {
    return this.http.get<DateBooking>(`${this.apiUrl}/${id}`);
  }

  // Create a new date booking
  createDate(booking: DateBooking): Observable<DateBooking> {
    return this.http.post<DateBooking>(this.apiUrl, booking);
  }

  // Update a date booking
  updateDate(id: string, booking: DateBooking): Observable<DateBooking> {
    return this.http.put<DateBooking>(`${this.apiUrl}/${id}`, booking);
  }

  // Delete a date booking
  deleteDate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
