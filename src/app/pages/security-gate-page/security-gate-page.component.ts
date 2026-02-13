import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-security-gate-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="security-gate">
      <div class="content" [class.success]="showSuccess">
        <h1 class="title">{{ showSuccess ? '❤️' : '🔐' }}</h1>
        
        <p class="message" *ngIf="!showSuccess">
          ეს გვერდი მხოლოდ ერთ ადამიანს ეკუთვნის.
        </p>
        
        <p class="success-message" *ngIf="showSuccess">
          კეთილი იყოს შენი მობრძანება, {{ enteredName }}! ❤️
        </p>

        <div class="input-container" *ngIf="!showSuccess">
          <input 
            type="text" 
            [(ngModel)]="enteredName"
            (keyup.enter)="checkName()"
            placeholder="შეიყვანე შენი სახელი..."
            class="name-input"
            [class.error]="showError"
            autofocus
          />
          
          <button (click)="checkName()" class="submit-btn">
            <span class="btn-text">შესვლა</span>
            <span class="btn-icon">→</span>
          </button>
        </div>

        <p class="error-text" *ngIf="showError">
          სამწუხაროდ, ეს გვერდი არ არის შენთვის... 💔
        </p>
      </div>

      <!-- Floating hearts animation -->
      <div class="hearts-bg">
        <div class="heart" *ngFor="let i of [1,2,3,4,5,6,7,8]" [style.left.%]="i * 12" [style.animation-delay.s]="i * 0.5"></div>
      </div>
    </div>
  `,
  styles: [`
    .security-gate {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #fff0f3, #ffccd5, #ffc0cb);
      position: relative;
      overflow: hidden;
    }

    .content {
      text-align: center;
      padding: 60px 40px;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(15px);
      border-radius: 30px;
      border: 2px solid rgba(255, 255, 255, 0.5);
      box-shadow: 0 15px 50px rgba(255, 77, 109, 0.2);
      max-width: 500px;
      width: 90%;
      z-index: 10;
      transition: all 0.5s ease;

      &.success {
        animation: successPulse 0.6s ease-out;
      }
    }

    .title {
      font-size: 5rem;
      margin-bottom: 30px;
      animation: float 3s ease-in-out infinite;
    }

    .message, .success-message {
      font-family: var(--font-serif);
      font-size: 1.8rem;
      color: var(--text-color);
      margin-bottom: 40px;
      line-height: 1.6;
    }

    .success-message {
      color: var(--primary-color);
      font-weight: bold;
      animation: fadeInScale 0.5s ease-out;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;
    }

    .name-input {
      padding: 18px 25px;
      font-size: 1.3rem;
      border: 2px solid rgba(255, 77, 109, 0.3);
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.8);
      color: var(--text-color);
      font-family: var(--font-sans);
      transition: all 0.3s ease;
      text-align: center;

      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 20px rgba(255, 77, 109, 0.3);
        transform: scale(1.02);
      }

      &.error {
        border-color: #dc3545;
        animation: shake 0.5s;
      }

      &::placeholder {
        color: rgba(89, 13, 34, 0.5);
      }
    }

    .submit-btn {
      padding: 18px 40px;
      font-size: 1.3rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 15px;
      cursor: pointer;
      font-family: var(--font-sans);
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.3s ease;
      box-shadow: 0 5px 20px rgba(255, 77, 109, 0.4);

      &:hover {
        background: var(--accent-color);
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(255, 77, 109, 0.6);
      }

      &:active {
        transform: translateY(-1px);
      }

      .btn-icon {
        font-size: 1.5rem;
        transition: transform 0.3s ease;
      }

      &:hover .btn-icon {
        transform: translateX(5px);
      }
    }

    .error-text {
      color: #dc3545;
      font-size: 1.1rem;
      margin-top: 15px;
      animation: fadeIn 0.3s ease-out;
    }

    .hearts-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .heart {
      position: absolute;
      bottom: -50px;
      font-size: 2rem;
      color: rgba(255, 77, 109, 0.3);
      animation: floatUp 8s linear infinite;

      &::before {
        content: '❤️';
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes successPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes floatUp {
      0% {
        bottom: -50px;
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        bottom: 110vh;
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      .content {
        padding: 40px 30px;
      }

      .title {
        font-size: 4rem;
      }

      .message, .success-message {
        font-size: 1.5rem;
      }

      .name-input, .submit-btn {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 480px) {
      .content {
        padding: 30px 20px;
      }

      .title {
        font-size: 3rem;
      }

      .message, .success-message {
        font-size: 1.3rem;
      }
    }
  `]
})
export class SecurityGatePageComponent {
  enteredName: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  checkName(): void {
    this.showError = false;
    
    if (this.authService.authenticate(this.enteredName)) {
      this.showSuccess = true;
      
      // Navigate to home after success animation
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    } else {
      this.showError = true;
      this.enteredName = '';
    }
  }
}
