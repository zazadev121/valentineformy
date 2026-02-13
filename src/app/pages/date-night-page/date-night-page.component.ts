import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DateOption {
  id: string;
  icon: string;
  title: string;
  titleGeo: string;
  description: string;
  response: string;
}

@Component({
  selector: 'app-date-night-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="date-night-page">
      <div class="content">
        <h1 class="title" *ngIf="!selectedOption">აირჩიე ჩვენი შეხვედრა 💑</h1>
        
        <div class="options-grid" *ngIf="!selectedOption">
          <div 
            *ngFor="let option of dateOptions" 
            class="option-card"
            (click)="selectOption(option)"
          >
            <div class="icon">{{ option.icon }}</div>
            <h3>{{ option.titleGeo }}</h3>
            <p class="description">{{ option.description }}</p>
          </div>
        </div>

        <div class="response-container" *ngIf="selectedOption" [@fadeInScale]>
          <div class="selected-icon">{{ selectedOption.icon }}</div>
          <h2 class="selected-title">{{ selectedOption.titleGeo }}</h2>
          <p class="response-text">{{ selectedOption.response }}</p>
          
          <button (click)="reset()" class="back-btn">
            აირჩიე სხვა ვარიანტი
          </button>
        </div>
      </div>

      <!-- Floating hearts -->
      <div class="floating-hearts">
        <div class="heart" *ngFor="let i of [1,2,3,4,5,6]">❤️</div>
      </div>
    </div>
  `,
  styles: [`
    .date-night-page {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #ffecd2, #fcb69f);
      padding: 40px 20px;
      position: relative;
      overflow: hidden;
    }

    .content {
      max-width: 1000px;
      width: 100%;
      z-index: 10;
    }

    .title {
      font-family: var(--font-serif);
      font-size: 3.5rem;
      color: var(--accent-color);
      text-align: center;
      margin-bottom: 60px;
      text-shadow: 0 4px 10px rgba(201, 24, 74, 0.2);
      animation: fadeInDown 0.6s ease-out;
    }

    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      animation: fadeInUp 0.8s ease-out;
    }

    .option-card {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(15px);
      border-radius: 25px;
      padding: 40px 30px;
      text-align: center;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: 2px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: translateY(-15px) scale(1.05);
        box-shadow: 0 20px 50px rgba(255, 77, 109, 0.3);
        border-color: var(--primary-color);
        background: rgba(255, 255, 255, 0.6);
      }

      .icon {
        font-size: 5rem;
        margin-bottom: 20px;
        animation: bounce 2s ease-in-out infinite;
      }

      h3 {
        font-family: var(--font-serif);
        font-size: 1.8rem;
        color: var(--text-color);
        margin-bottom: 15px;
      }

      .description {
        font-size: 1.1rem;
        color: rgba(89, 13, 34, 0.8);
        line-height: 1.6;
      }
    }

    .response-container {
      text-align: center;
      padding: 60px 40px;
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(20px);
      border-radius: 30px;
      border: 2px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 20px 60px rgba(255, 77, 109, 0.3);
      animation: fadeInScale 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      .selected-icon {
        font-size: 6rem;
        margin-bottom: 30px;
        animation: heartBeat 1.5s ease-in-out infinite;
      }

      .selected-title {
        font-family: var(--font-serif);
        font-size: 3rem;
        color: var(--accent-color);
        margin-bottom: 30px;
      }

      .response-text {
        font-family: var(--font-serif);
        font-size: 2rem;
        color: var(--text-color);
        line-height: 1.8;
        margin-bottom: 40px;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
      }

      .back-btn {
        padding: 15px 40px;
        font-size: 1.2rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-family: var(--font-sans);
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(255, 77, 109, 0.4);

        &:hover {
          background: var(--accent-color);
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(255, 77, 109, 0.6);
        }
      }
    }

    .floating-hearts {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      overflow: hidden;

      .heart {
        position: absolute;
        font-size: 2rem;
        opacity: 0.3;
        animation: floatHeart 15s linear infinite;

        @for $i from 1 through 6 {
          &:nth-child(#{$i}) {
            left: #{$i * 15%};
            animation-delay: #{$i * 2s};
            font-size: #{1.5 + random(10) * 0.1}rem;
          }
        }
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

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @keyframes heartBeat {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.1); }
      50% { transform: scale(1); }
      75% { transform: scale(1.15); }
    }

    @keyframes floatHeart {
      0% {
        bottom: -10%;
        transform: translateX(0) rotate(0deg);
      }
      100% {
        bottom: 110%;
        transform: translateX(50px) rotate(360deg);
      }
    }

    @media (max-width: 768px) {
      .title {
        font-size: 2.5rem;
        margin-bottom: 40px;
      }

      .options-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .response-container {
        padding: 40px 30px;

        .selected-icon {
          font-size: 5rem;
        }

        .selected-title {
          font-size: 2.5rem;
        }

        .response-text {
          font-size: 1.6rem;
        }
      }
    }

    @media (max-width: 480px) {
      .title {
        font-size: 2rem;
      }

      .option-card {
        padding: 30px 20px;

        .icon {
          font-size: 4rem;
        }

        h3 {
          font-size: 1.5rem;
        }
      }

      .response-container {
        padding: 30px 20px;

        .selected-icon {
          font-size: 4rem;
        }

        .selected-title {
          font-size: 2rem;
        }

        .response-text {
          font-size: 1.3rem;
        }
      }
    }
  `]
})
export class DateNightPageComponent {
  selectedOption: DateOption | null = null;

  dateOptions: DateOption[] = [
    {
      id: 'night-walk',
      icon: '🌃',
      title: 'Night Walk',
      titleGeo: 'ღამის სეირნობა',
      description: 'მთვარის შუქზე ერთად სეირნობა',
      response: 'ღამის სეირნობა შენთან ერთად... ვარსკვლავების ქვეშ, ხელში ხელჩაკიდებული. არაფერი არ არის უფრო რომანტიული. დავიწყოთ ღამე, რომელიც არასოდეს დასრულდება. 🌙✨'
    },
    {
      id: 'romantic-dinner',
      icon: '🍽',
      title: 'Romantic Dinner',
      titleGeo: 'რომანტიული ვახშამი',
      description: 'სანთლების შუქზე ვახშამი',
      response: 'რომანტიული ვახშამი შენთან... სანთლების შუქი, ლამაზი მუსიკა და შენი თვალები. ეს იქნება საღამო, რომელსაც ვერასოდეს დავივიწყებთ. შენ ხარ ჩემი საუკეთესო კერძი. 🕯️❤️'
    },
    {
      id: 'movie-night',
      icon: '🎬',
      title: 'Movie Night',
      titleGeo: 'კინოს საღამო',
      description: 'ფილმის ყურება ერთად',
      response: 'კინოს საღამო შენთან... პოპკორნი, პლედი და შენი თავი ჩემს მხარზე. ფილმი არ აქვს მნიშვნელობა, როცა შენ ხარ ჩემთან. შენ ხარ ჩემი საყვარელი ფილმი. 🍿💕'
    },
    {
      id: 'trip-together',
      icon: '✈️',
      title: 'Trip Together',
      titleGeo: 'მოგზაურობა ერთად',
      description: 'ახალი ადგილების აღმოჩენა',
      response: 'მოგზაურობა შენთან... ახალი ადგილები, ახალი მოგონებები, მაგრამ ყველაზე მთავარი - შენ ჩემს გვერდით. სადაც არ უნდა წავიდეთ, შენთან ერთად ყველგან სახლია. 🗺️💖'
    }
  ];

  selectOption(option: DateOption): void {
    this.selectedOption = option;
  }

  reset(): void {
    this.selectedOption = null;
  }
}
