import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-world-without-you-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="world-page" [class.colorful]="hasColor">
      <div class="content">
        <div *ngIf="!hasColor" class="gray-state">
          <h1 class="gray-title">სამყარო შენს გარეშე...</h1>
          
          <div class="gray-elements">
            <div class="element">🌑</div>
            <div class="element">💔</div>
            <div class="element">🥀</div>
            <div class="element">😔</div>
          </div>

          <p class="gray-text">
            ყველაფერი ნაცრისფერია...<br>
            სიცოცხლეს აზრი არ აქვს...<br>
            სამყარო ცარიელია...
          </p>

          <button (click)="restoreColors()" class="restore-btn">
            დააბრუნე ფერები
          </button>
        </div>

        <div *ngIf="hasColor" class="colorful-state">
          <h1 class="colorful-title">შენ ხარ ჩემი ფერი ❤️</h1>
          
          <div class="color-burst">
            <div class="burst-circle" *ngFor="let i of [1,2,3,4,5,6,7,8]"></div>
          </div>

          <div class="colorful-elements">
            <div class="element">🌈</div>
            <div class="element">❤️</div>
            <div class="element">🌹</div>
            <div class="element">😊</div>
            <div class="element">✨</div>
            <div class="element">🌟</div>
          </div>

          <div class="message-box">
            <p class="main-message">
              შენ აბრუნებ ფერებს ჩემს სამყაროს!
            </p>
            <p class="sub-message">
              შენს გარეშე ყველაფერი ნაცრისფერია,<br>
              მაგრამ შენთან ერთად სამყარო ანათებს.<br>
              შენ ხარ ჩემი ცხოვრების ყველა ფერი! 🌈💖
            </p>
          </div>
        </div>
      </div>

      <!-- Background particles -->
      <div class="particles" *ngIf="hasColor">
        <div class="particle" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12]"></div>
      </div>
    </div>
  `,
  styles: [`
    .world-page {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px 20px;
      position: relative;
      overflow: hidden;
      transition: background 1.5s ease;
      background: linear-gradient(135deg, #2c3e50, #34495e, #2c3e50);

      &.colorful {
        background: linear-gradient(135deg, #ff6b9d, #c06c84, #f67280, #feca57, #48dbfb, #ff9ff3);
        background-size: 400% 400%;
        animation: gradientShift 8s ease infinite;
      }
    }

    .content {
      max-width: 900px;
      width: 100%;
      text-align: center;
      z-index: 10;
      position: relative;
    }

    /* Gray State */
    .gray-state {
      animation: fadeIn 1s ease-out;

      .gray-title {
        font-family: var(--font-serif);
        font-size: 4rem;
        color: #7f8c8d;
        margin-bottom: 50px;
        text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        filter: grayscale(100%);
      }

      .gray-elements {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin: 50px 0;
        filter: grayscale(100%);

        .element {
          font-size: 4rem;
          opacity: 0.5;
          animation: slowFloat 4s ease-in-out infinite;

          @for $i from 1 through 4 {
            &:nth-child(#{$i}) {
              animation-delay: #{$i * 0.5s};
            }
          }
        }
      }

      .gray-text {
        font-family: var(--font-serif);
        font-size: 2rem;
        color: #95a5a6;
        line-height: 2;
        margin: 50px 0;
        filter: grayscale(100%);
      }

      .restore-btn {
        padding: 20px 50px;
        font-size: 1.5rem;
        background: linear-gradient(135deg, #7f8c8d, #95a5a6);
        color: white;
        border: 2px solid #bdc3c7;
        border-radius: 50px;
        cursor: pointer;
        font-family: var(--font-sans);
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: pulse 2s ease-in-out infinite;

        &:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }
      }
    }

    /* Colorful State */
    .colorful-state {
      animation: explodeIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      .colorful-title {
        font-family: var(--font-serif);
        font-size: 4.5rem;
        background: linear-gradient(135deg, #ff6b9d, #c06c84, #f67280, #feca57);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 50px;
        text-shadow: 0 4px 20px rgba(255, 107, 157, 0.5);
        animation: rainbow 3s ease-in-out infinite;
      }

      .color-burst {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        pointer-events: none;

        .burst-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          animation: burstOut 1.5s ease-out forwards;

          &:nth-child(1) {
            background: hsl(45, 80%, 60%);
            animation-delay: 0.1s;
            transform: translate(-50%, -50%) rotate(45deg);
          }
          &:nth-child(2) {
            background: hsl(90, 80%, 60%);
            animation-delay: 0.2s;
            transform: translate(-50%, -50%) rotate(90deg);
          }
          &:nth-child(3) {
            background: hsl(135, 80%, 60%);
            animation-delay: 0.3s;
            transform: translate(-50%, -50%) rotate(135deg);
          }
          &:nth-child(4) {
            background: hsl(180, 80%, 60%);
            animation-delay: 0.4s;
            transform: translate(-50%, -50%) rotate(180deg);
          }
          &:nth-child(5) {
            background: hsl(225, 80%, 60%);
            animation-delay: 0.5s;
            transform: translate(-50%, -50%) rotate(225deg);
          }
          &:nth-child(6) {
            background: hsl(270, 80%, 60%);
            animation-delay: 0.6s;
            transform: translate(-50%, -50%) rotate(270deg);
          }
          &:nth-child(7) {
            background: hsl(315, 80%, 60%);
            animation-delay: 0.7s;
            transform: translate(-50%, -50%) rotate(315deg);
          }
          &:nth-child(8) {
            background: hsl(360, 80%, 60%);
            animation-delay: 0.8s;
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      }

      .colorful-elements {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 30px;
        margin: 50px 0;

        .element {
          font-size: 4rem;
          animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;

          @for $i from 1 through 6 {
            &:nth-child(#{$i}) {
              animation-delay: #{0.5 + $i * 0.1s};
            }
          }
        }
      }

      .message-box {
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(20px);
        border-radius: 30px;
        padding: 50px 40px;
        margin-top: 50px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 20px 60px rgba(255, 107, 157, 0.3);
        animation: fadeInUp 1s ease-out 1.5s backwards;

        .main-message {
          font-family: var(--font-serif);
          font-size: 3rem;
          color: white;
          margin-bottom: 30px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          font-weight: bold;
        }

        .sub-message {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: rgba(255, 255, 255, 0.95);
          line-height: 2;
        }
      }
    }

    .particles {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;

      .particle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        animation: particleFloat 6s linear infinite;

        &:nth-child(1) { background: hsl(30, 80%, 60%); left: 10%; top: 20%; animation-delay: 0.5s; width: 8px; height: 8px; }
        &:nth-child(2) { background: hsl(60, 80%, 60%); left: 25%; top: 50%; animation-delay: 1s; width: 12px; height: 12px; }
        &:nth-child(3) { background: hsl(90, 80%, 60%); left: 40%; top: 15%; animation-delay: 1.5s; width: 10px; height: 10px; }
        &:nth-child(4) { background: hsl(120, 80%, 60%); left: 55%; top: 70%; animation-delay: 2s; width: 14px; height: 14px; }
        &:nth-child(5) { background: hsl(150, 80%, 60%); left: 70%; top: 30%; animation-delay: 2.5s; width: 9px; height: 9px; }
        &:nth-child(6) { background: hsl(180, 80%, 60%); left: 85%; top: 60%; animation-delay: 3s; width: 11px; height: 11px; }
        &:nth-child(7) { background: hsl(210, 80%, 60%); left: 15%; top: 80%; animation-delay: 3.5s; width: 13px; height: 13px; }
        &:nth-child(8) { background: hsl(240, 80%, 60%); left: 30%; top: 40%; animation-delay: 4s; width: 10px; height: 10px; }
        &:nth-child(9) { background: hsl(270, 80%, 60%); left: 45%; top: 90%; animation-delay: 4.5s; width: 12px; height: 12px; }
        &:nth-child(10) { background: hsl(300, 80%, 60%); left: 60%; top: 25%; animation-delay: 5s; width: 8px; height: 8px; }
        &:nth-child(11) { background: hsl(330, 80%, 60%); left: 75%; top: 55%; animation-delay: 5.5s; width: 14px; height: 14px; }
        &:nth-child(12) { background: hsl(360, 80%, 60%); left: 90%; top: 10%; animation-delay: 6s; width: 11px; height: 11px; }
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slowFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes explodeIn {
      from {
        opacity: 0;
        transform: scale(0.5);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes burstOut {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) translateX(300px) scale(1);
        opacity: 0;
      }
    }

    @keyframes popIn {
      from {
        opacity: 0;
        transform: scale(0);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes rainbow {
      0%, 100% { filter: hue-rotate(0deg); }
      50% { filter: hue-rotate(360deg); }
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes particleFloat {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translate(100px, -100px) rotate(360deg);
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      .gray-state .gray-title,
      .colorful-state .colorful-title {
        font-size: 3rem;
      }

      .gray-elements .element,
      .colorful-elements .element {
        font-size: 3rem;
      }

      .gray-text {
        font-size: 1.6rem;
      }

      .message-box {
        padding: 40px 30px;

        .main-message {
          font-size: 2.5rem;
        }

        .sub-message {
          font-size: 1.5rem;
        }
      }
    }

    @media (max-width: 480px) {
      .gray-state .gray-title,
      .colorful-state .colorful-title {
        font-size: 2.5rem;
      }

      .gray-elements,
      .colorful-elements {
        gap: 20px;

        .element {
          font-size: 2.5rem;
        }
      }

      .gray-text {
        font-size: 1.3rem;
      }

      .restore-btn {
        padding: 15px 35px;
        font-size: 1.2rem;
      }

      .message-box {
        padding: 30px 20px;

        .main-message {
          font-size: 2rem;
        }

        .sub-message {
          font-size: 1.2rem;
        }
      }
    }
  `]
})
export class WorldWithoutYouPageComponent {
  hasColor: boolean = false;

  restoreColors(): void {
    this.hasColor = true;
  }
}
