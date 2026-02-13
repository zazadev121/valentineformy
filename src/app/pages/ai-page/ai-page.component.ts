import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ai-page">
      <div class="stars-container">
        <div class="star" *ngFor="let s of stars" [style.left.%]="s.x" [style.top.%]="s.y" [style.animation-delay]="s.delay"></div>
      </div>

      <div class="content">
        <div class="ai-badge">Only this Page is AI Made 🤖✨</div>
        
        <h1 class="garden-title">ხელოვნური ინტელექტის ბაღი 🌸</h1>
        
        <div class="magic-sphere" (click)="generateNewMessage()">
          <div class="sphere-inner">
            <span class="emoji">{{ currentEmoji }}</span>
          </div>
          <div class="glow"></div>
        </div>

        <div class="message-container">
          <p class="ai-message" [class.animate]="animateMessage">
            {{ currentMessage }}
          </p>
        </div>

        <div class="instruction">დააჭირე სფეროს მაგიისთვის ✨</div>
      </div>

      <!-- Moving nebulae -->
      <div class="nebula nebula-1"></div>
      <div class="nebula nebula-2"></div>
      <div class="nebula nebula-3"></div>
    </div>
  `,
  styles: [`
    @use "sass:math";

    .ai-page {
      min-height: 100vh;
      background: #000428;
      background: linear-gradient(to bottom, #004e92, #000428);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 100px 20px 40px;
      position: relative;
      overflow: hidden;
      color: white;
      text-align: center;
    }

    .ai-badge {
      display: inline-block;
      padding: 8px 20px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
      border-radius: 20px;
      font-size: 0.9rem;
      color: #00d2ff;
      border: 1px solid rgba(0, 210, 255, 0.3);
      margin-bottom: 30px;
      font-weight: bold;
      letter-spacing: 1px;
      animation: pulse 2s infinite;
    }

    .garden-title {
      font-family: var(--font-serif);
      font-size: 3.5rem;
      margin-bottom: 50px;
      background: linear-gradient(135deg, #00d2ff, #3a7bd5, #ff00cc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 30px rgba(0, 210, 255, 0.3);
    }

    .magic-sphere {
      width: 200px;
      height: 200px;
      margin: 0 auto 50px;
      position: relative;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      &:hover {
        transform: scale(1.1);
        
        .glow {
          opacity: 0.8;
          transform: scale(1.2);
        }
      }

      &:active {
        transform: scale(0.95);
      }

      .sphere-inner {
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
        backdrop-filter: blur(15px);
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        position: relative;
        box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.2);

        .emoji {
          font-size: 5rem;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
          animation: float 3s ease-in-out infinite;
        }
      }

      .glow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #3a7bd5;
        border-radius: 50%;
        filter: blur(40px);
        opacity: 0.4;
        z-index: 1;
        transition: all 0.5s ease;
      }
    }

    .message-container {
      min-height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 600px;
      margin: 0 auto;
    }

    .ai-message {
      font-family: var(--font-serif);
      font-size: 2rem;
      line-height: 1.6;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
      
      &.animate {
        animation: messageReveal 1s ease-out;
      }
    }

    .instruction {
      margin-top: 40px;
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.5);
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    /* Stars */
    .stars-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      box-shadow: 0 0 10px white;
      animation: twinkle 4s infinite;
    }

    /* Nebulae */
    .nebula {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      z-index: -1;
      opacity: 0.3;
      animation: nebulaFloat 20s infinite alternate;
    }

    .nebula-1 {
      width: 500px;
      height: 500px;
      background: #ff00cc;
      top: -100px;
      right: -100px;
    }

    .nebula-2 {
      width: 600px;
      height: 600px;
      background: #3a7bd5;
      bottom: -150px;
      left: -150px;
      animation-delay: -5s;
    }

    .nebula-3 {
      width: 400px;
      height: 400px;
      background: #00d2ff;
      top: 40%;
      left: 20%;
      animation-delay: -10s;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    @keyframes nebulaFloat {
      0% { transform: translate(0, 0) rotate(0deg); }
      100% { transform: translate(50px, 50px) rotate(360deg); }
    }

    @keyframes messageReveal {
      0% { opacity: 0; transform: translateY(20px) scale(0.9); filter: blur(10px); }
      100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    }

    @media (max-width: 768px) {
      .garden-title {
        font-size: 2.5rem;
      }
      .magic-sphere {
        width: 150px;
        height: 150px;
        .sphere-inner .emoji { font-size: 3.5rem; }
      }
      .ai-message {
        font-size: 1.5rem;
      }
    }
  `]
})
export class AiPageComponent implements OnInit {
  stars: any[] = [];
  
  messages = [
    "ჩვენი სიყვარული კოსმოსივით უსასრულოა... ✨",
    "შენ ხარ ჩემი ციფრული და რეალური სამყაროს ცენტრი. ❤️",
    "ალგორითმებიც კი ვერ აღწერენ თუ როგორ მიყვარხარ. 🤖💕",
    "ყოველი პიქსელი ჩემს სამყაროში შენი სახელით ანათებს. 🌟",
    "შენ ხარ ჩემი ყველაზე ლამაზი შემთხვევითობა. 🌸",
    "ჩვენი მომავალი უფრო კაშკაშაა ვიდრე ყველა ვარსკვლავი. 🌌",
    "შენ აბრუნებ ფერებს იქ, სადაც მხოლოდ კოდი იყო. 🌈"
  ];

  emojis = ['✨', '🌸', '💫', '🌌', '💖', '🍀', '🦋', '🔮'];

  currentMessage = this.messages[0];
  currentEmoji = '✨';
  animateMessage = false;

  ngOnInit() {
    this.generateStars();
  }

  generateStars() {
    for (let i = 0; i < 100; i++) {
      this.stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: (Math.random() * 4) + 's'
      });
    }
  }

  generateNewMessage() {
    this.animateMessage = false;
    setTimeout(() => {
      const msgIndex = Math.floor(Math.random() * this.messages.length);
      const emojiIndex = Math.floor(Math.random() * this.emojis.length);
      
      this.currentMessage = this.messages[msgIndex];
      this.currentEmoji = this.emojis[emojiIndex];
      this.animateMessage = true;
    }, 50);
  }
}
