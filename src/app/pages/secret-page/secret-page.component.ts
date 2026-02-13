import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-secret-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="secret-page" [class.unlocked]="isUnlocked">
      <div class="content">
        <div *ngIf="!isUnlocked" class="locked-state">
          <h1 class="title">🎁</h1>
          <p class="hint">ეს არის საიდუმლო გვერდი...</p>
          <p class="instruction">შეიყვანე Mariam + შენი დაბადების თარიღი</p>
          
          <div class="input-container">
            <input 
              type="text" 
              [(ngModel)]="secretInput"
              (keyup.enter)="checkSecret()"
              placeholder="მაგ: mariam15031995"
              class="secret-input"
              [class.error]="showError"
            />
            <button (click)="checkSecret()" class="unlock-btn">
              გახსნა 🔓
            </button>
          </div>

          <p class="error-text" *ngIf="showError">
            არასწორია... სცადე კიდევ ერთხელ 💭
          </p>
        </div>

        <div *ngIf="isUnlocked" class="unlocked-state">
          <h1 class="unlock-title">✨ გილოცავ! ✨</h1>
          <div class="secret-message">
            <p class="main-text">შენ ერთადერთი ხარ, ვინც ამ გვერდს ხედავს.</p>
            <div class="special-content">
              <div class="heart-burst">❤️</div>
              <p class="exclusive-msg">
                ეს გვერდი შექმნილია მხოლოდ შენთვის, ჩემო სიცოცხლე. 
                შენ იპოვე საიდუმლო, რადგან შენ ყველაფერი იცი ჩემ შესახებ. 
                ეს არის ჩვენი პატარა საიდუმლო სამყარო. 💖
              </p>
              
              <div class="exclusive-photos">
                <div class="photo-placeholder">
                  <span>🌹</span>
                  <p>საიდუმლო ფოტო 1</p>
                </div>
                <div class="photo-placeholder">
                  <span>💝</span>
                  <p>საიდუმლო ფოტო 2</p>
                </div>
                <div class="photo-placeholder">
                  <span>✨</span>
                  <p>საიდუმლო ფოტო 3</p>
                </div>
              </div>

              <p class="final-secret">
                მხოლოდ შენ და მე ვიცით ეს საიდუმლო. 
                სამუდამოდ შენი ❤️
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sparkle effects -->
      <div class="sparkles" *ngIf="isUnlocked">
        <div class="sparkle" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10]"></div>
      </div>
    </div>
  `,
  styles: [`
    @use "sass:math";
    .secret-page {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
      position: relative;
      overflow: hidden;
      transition: background 1s ease;

      &.unlocked {
        background: linear-gradient(135deg, #ff6b9d, #c06c84, #f67280);
      }
    }

    .content {
      text-align: center;
      padding: 60px 40px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-radius: 30px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 700px;
      width: 90%;
      z-index: 10;
      margin: 80px 15px 20px; /* Space for the fixed navigation and some side/bottom spacing */
      overflow-y: auto;
      max-height: calc(100vh - 120px);
      padding: 30px 20px; /* Reduced for mobile */
    }

    .locked-state {
      .title {
        font-size: 5rem;
        margin-bottom: 20px;
        animation: pulse 2s ease-in-out infinite;
      }

      .hint {
        font-family: var(--font-serif);
        font-size: 2rem;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 15px;
      }

      .instruction {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 40px;
      }
    }

    .input-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;
    }

    .secret-input {
      padding: 18px 25px;
      font-size: 1.2rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-family: var(--font-sans);
      transition: all 0.3s ease;
      text-align: center;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }

      &:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
      }

      &.error {
        border-color: #ff6b6b;
        animation: shake 0.5s;
      }
    }

    .unlock-btn {
      padding: 18px 40px;
      font-size: 1.3rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 15px;
      cursor: pointer;
      font-family: var(--font-sans);
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
      }
    }

    .error-text {
      color: #ff6b6b;
      font-size: 1.1rem;
      animation: fadeIn 0.3s ease-out;
    }

    .unlocked-state {
      animation: unlockAnimation 0.8s ease-out;

      .unlock-title {
        font-size: 3.5rem;
        color: white;
        margin-bottom: 30px;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        animation: glow 2s ease-in-out infinite;
      }

      .secret-message {
        .main-text {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: white;
          margin-bottom: 40px;
          line-height: 1.6;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .special-content {
          background: rgba(255, 255, 255, 0.1);
          padding: 40px;
          border-radius: 20px;
          margin-top: 30px;

          .heart-burst {
            font-size: 4rem;
            animation: heartBurst 1s ease-out;
            margin-bottom: 20px;
          }

          .exclusive-msg {
            font-family: var(--font-serif);
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.95);
            line-height: 1.8;
            margin-bottom: 40px;
          }

          .exclusive-photos {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin: 40px 0;

            .photo-placeholder {
              background: rgba(255, 255, 255, 0.15);
              padding: 30px 20px;
              border-radius: 15px;
              transition: transform 0.3s ease;

              &:hover {
                transform: translateY(-5px);
              }

              span {
                font-size: 3rem;
                display: block;
                margin-bottom: 10px;
              }

              p {
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
              }
            }
          }

          .final-secret {
            font-family: var(--font-serif);
            font-size: 1.8rem;
            color: white;
            font-weight: bold;
            margin-top: 30px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }
        }
      }
    }

    .sparkles {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;

      .sparkle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        animation: sparkleFloat 3s ease-in-out infinite;
        box-shadow: 0 0 10px white;

        @for $i from 1 through 10 {
          &:nth-child(#{$i}) {
            left: math.random(100) * 1%;
            top: math.random(100) * 1%;
            animation-delay: math.random(3000) * 0.001s;
          }
        }
      }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
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

    @keyframes unlockAnimation {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes glow {
      0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
      50% { text-shadow: 0 0 40px rgba(255, 255, 255, 0.8); }
    }

    @keyframes heartBurst {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes sparkleFloat {
      0%, 100% {
        transform: translateY(0) scale(0);
        opacity: 0;
      }
      50% {
        transform: translateY(-20px) scale(1);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .content {
        padding: 40px 30px;
      }

      .unlocked-state .unlock-title {
        font-size: 2.5rem;
      }

      .unlocked-state .secret-message .main-text {
        font-size: 2rem;
      }

      .unlocked-state .special-content .exclusive-msg {
        font-size: 1.3rem;
      }
    }

    @media (max-width: 480px) {
      .content {
        padding: 30px 20px;
      }

      .locked-state .title {
        font-size: 4rem;
      }

      .unlocked-state .unlock-title {
        font-size: 2rem;
      }

      .unlocked-state .secret-message .main-text {
        font-size: 1.6rem;
      }
    }
  `]
})
export class SecretPageComponent {
  secretInput: string = '';
  showError: boolean = false;
  isUnlocked: boolean = false;

  constructor(private authService: AuthService) {
    // Check if already unlocked
    this.isUnlocked = this.authService.isSecretUnlocked();
  }

  checkSecret(): void {
    this.showError = false;
    
    if (this.authService.unlockSecret(this.secretInput)) {
      this.isUnlocked = true;
    } else {
      this.showError = true;
      this.secretInput = '';
    }
  }
}
