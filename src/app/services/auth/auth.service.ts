import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'mariam_authenticated';
  private readonly SECRET_KEY = 'mariam_secret_unlocked';
  
  private authenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public authenticated$: Observable<boolean> = this.authenticatedSubject.asObservable();

  private secretUnlockedSubject = new BehaviorSubject<boolean>(this.isSecretUnlocked());
  public secretUnlocked$: Observable<boolean> = this.secretUnlockedSubject.asObservable();

  constructor() {}

  // Check if user entered correct name
  isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  // Verify name and authenticate
  authenticate(name: string): boolean {
    const acceptedNames = [
      'მარი', 'მარიამ', 'მარიამი', 'მარიამო', 'მარიამიი', 'მარიამმმ', // Georgian variations
      'mary', 'mariam', 'mari', 'maro', 'mariami'                    // English variations
    ];
    
    const normalizedName = name.toLowerCase().trim();
    
    if (acceptedNames.some(acceptedName => normalizedName === acceptedName.toLowerCase())) {
      localStorage.setItem(this.AUTH_KEY, 'true');
      this.authenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  // Check if secret page is unlocked
  isSecretUnlocked(): boolean {
    return localStorage.getItem(this.SECRET_KEY) === 'true';
  }

  // Unlock secret page with birthdate
  unlockSecret(input: string): boolean {
    // Mariam's birthdate: May 1, 2010 (01052010)
    const secretCode = 'mariam01052010';
    
    if (input.toLowerCase().trim() === secretCode.toLowerCase()) {
      localStorage.setItem(this.SECRET_KEY, 'true');
      this.secretUnlockedSubject.next(true);
      return true;
    }
    return false;
  }

  // Logout (for testing purposes)
  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.authenticatedSubject.next(false);
  }

  // Reset secret (for testing purposes)
  resetSecret(): void {
    localStorage.removeItem(this.SECRET_KEY);
    this.secretUnlockedSubject.next(false);
  }
}
