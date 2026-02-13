import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comfort-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="comfort-page">
      <div class="glow-orb glow-1"></div>
      <div class="glow-orb glow-2"></div>
      <div class="glow-orb glow-3"></div>

      <div class="content">
        <div class="comfort-icon">🤗</div>
        
        <h1 class="title">როცა მოწყენილი ხარ...</h1>
        
        <div class="message-box">
          <p class="main-message">
            თუ ოდესმე მოწყენილი იქნები…<br>
            დაიმახსოვრე, რომ შენ ჩემი სიხარული ხარ.
          </p>

          <div class="comfort-items">
            <div class="comfort-item">
              <span class="item-icon">💝</span>
              <p>შენ ხარ ჩემი ყველაფერი</p>
            </div>
            <div class="comfort-item">
              <span class="item-icon">🌟</span>
              <p>შენი ღიმილი ანათებს ჩემს სამყაროს</p>
            </div>
            <div class="comfort-item">
              <span class="item-icon">🫂</span>
              <p>ყოველთვის ვარ შენთან, გულში</p>
            </div>
            <div class="comfort-item">
              <span class="item-icon">☀️</span>
              <p>ხვალ უკეთესი დღე იქნება</p>
            </div>
          </div>

          <div class="final-words">
            <p>
              დაიმახსოვრე: შენ არ ხარ მარტო.<br>
              მე ყოველთვის ვარ აქ შენთვის.<br>
              სამუდამოდ შენი ❤️
            </p>
          </div>
        </div>

        <!-- Floating warm hearts -->
        <div class="warm-hearts">
          <div class="warm-heart" *ngFor="let i of [1,2,3,4,5,6,7,8]">💛</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .comfort-page {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #ffeaa7, #fdcb6e, #fab1a0);
      padding: 40px 20px;
      position: relative;
      overflow: hidden;
    }

    .glow-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.4;
      animation: floatGlow 8s ease-in-out infinite;
    }

    .glow-1 {
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, #ff9ff3, #feca57);
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }

    .glow-2 {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, #feca57, #ff6b6b);
      bottom: 10%;
      right: 10%;
      animation-delay: 2s;
    }

    .glow-3 {
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, #48dbfb, #ff9ff3);
      top: 50%;
      left: 50%;
      animation-delay: 4s;
    }

    .content {
      max-width: 800px;
      width: 100%;
      text-align: center;
      z-index: 10;
      position: relative;
    }

    .comfort-icon {
      font-size: 6rem;
      margin-bottom: 30px;
      animation: gentleBounce 3s ease-in-out infinite;
    }

    .title {
      font-family: var(--font-serif);
      font-size: 3.5rem;
      color: #2d3436;
      margin-bottom: 50px;
      text-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      animation: fadeInDown 0.8s ease-out;
    }

    .message-box {
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(20px);
      border-radius: 30px;
      padding: 60px 40px;
      border: 2px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      animation: fadeInUp 1s ease-out;
    }

    .main-message {
      font-family: var(--font-serif);
      font-size: 2.5rem;
      color: #2d3436;
      line-height: 1.8;
      margin-bottom: 50px;
      font-weight: 600;
    }

    .comfort-items {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
      margin: 50px 0;
    }

    .comfort-item {
      background: rgba(255, 255, 255, 0.6);
      padding: 30px 20px;
      border-radius: 20px;
      transition: all 0.3s ease;
      border: 2px solid rgba(255, 255, 255, 0.8);

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 40px rgba(255, 107, 107, 0.2);
        background: rgba(255, 255, 255, 0.8);
      }

      .item-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 15px;
        animation: pulse 2s ease-in-out infinite;
      }

      p {
        font-family: var(--font-serif);
        font-size: 1.3rem;
        color: #2d3436;
        line-height: 1.6;
      }
    }

    .final-words {
      margin-top: 50px;
      padding: 40px;
      background: rgba(255, 107, 107, 0.2);
      border-radius: 20px;
      border: 2px solid rgba(255, 107, 107, 0.3);

      p {
        font-family: var(--font-serif);
        font-size: 2rem;
        color: #2d3436;
        line-height: 2;
        font-weight: 600;
      }
    }

    .warm-hearts {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;

      .warm-heart {
        @use "sass:math";
        position: absolute;
        font-size: 2.5rem;
        opacity: 0.6;
        animation: warmFloat 12s linear infinite;

        @for $i from 1 through 8 {
          &:nth-child(#{$i}) {
            left: #{$i * 12%};
            animation-delay: #{$i * 1.5s};
            font-size: #{2 + math.random(10) * 0.1}rem;
          }
        }
      }
    }

    @keyframes floatGlow {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(30px, -30px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
    }

    @keyframes gentleBounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
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

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    @keyframes warmFloat {
      0% {
        bottom: -10%;
        transform: translateX(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        bottom: 110%;
        transform: translateX(100px) rotate(360deg);
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      .comfort-icon {
        font-size: 5rem;
      }

      .title {
        font-size: 2.5rem;
        margin-bottom: 40px;
      }

      .message-box {
        padding: 40px 30px;
      }

      .main-message {
        font-size: 2rem;
      }

      .comfort-items {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .final-words p {
        font-size: 1.6rem;
      }
    }

    @media (max-width: 480px) {
      .comfort-icon {
        font-size: 4rem;
      }

      .title {
        font-size: 2rem;
      }

      .message-box {
        padding: 30px 20px;
      }

      .main-message {
        font-size: 1.6rem;
      }

      .comfort-item {
        padding: 25px 15px;

        .item-icon {
          font-size: 2.5rem;
        }

        p {
          font-size: 1.1rem;
        }
      }

      .final-words {
        padding: 30px 20px;

        p {
          font-size: 1.4rem;
        }
      }
    }
  `]
})
export class ComfortPageComponent {}
