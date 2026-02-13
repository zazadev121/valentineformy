import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FutureChoice {
  category: string;
  categoryGeo: string;
  icon: string;
  options: {
    id: string;
    name: string;
    nameGeo: string;
    emoji: string;
  }[];
}

interface SelectedChoices {
  house?: string;
  pet?: string;
  country?: string;
  car?: string;
}

@Component({
  selector: 'app-future-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="future-page">
      <div class="content">
        <h1 class="title" *ngIf="!showResult">ააშენე ჩვენი მომავალი 🏰</h1>
        
        <!-- Choice Categories -->
        <div class="categories" *ngIf="!showResult">
          <div *ngFor="let category of futureChoices" class="category-section">
            <h2 class="category-title">
              <span class="category-icon">{{ category.icon }}</span>
              {{ category.categoryGeo }}
            </h2>
            
            <div class="options-grid">
              <div 
                *ngFor="let option of category.options"
                class="option-card"
                [class.selected]="isSelected(category.category, option.id)"
                (click)="selectOption(category.category, option.id, option.nameGeo)"
              >
                <div class="option-emoji">{{ option.emoji }}</div>
                <p class="option-name">{{ option.nameGeo }}</p>
              </div>
            </div>
          </div>

          <button 
            *ngIf="allChoicesMade()" 
            (click)="generateFuture()" 
            class="generate-btn"
          >
            ნახე ჩვენი მომავალი ✨
          </button>
        </div>

        <!-- Future Result -->
        <div class="future-result" *ngIf="showResult">
          <div class="result-animation">
            <div class="sparkle">✨</div>
            <div class="sparkle">💫</div>
            <div class="sparkle">⭐</div>
          </div>

          <h2 class="result-title">ჩვენი მომავალი ერთად 💖</h2>

          <div class="future-vision">
            <div class="vision-item">
              <span class="vision-icon">🏡</span>
              <p class="vision-text">{{ getFutureMessage('house') }}</p>
            </div>
            <div class="vision-item">
              <span class="vision-icon">🐾</span>
              <p class="vision-text">{{ getFutureMessage('pet') }}</p>
            </div>
            <div class="vision-item">
              <span class="vision-icon">🌍</span>
              <p class="vision-text">{{ getFutureMessage('country') }}</p>
            </div>
            <div class="vision-item">
              <span class="vision-icon">🚗</span>
              <p class="vision-text">{{ getFutureMessage('car') }}</p>
            </div>
          </div>

          <div class="final-future-message">
            <p>
              ეს არის ჩვენი სამყარო, რომელსაც ერთად ავაშენებთ. 
              შენთან ერთად ყველა ოცნება რეალობად იქცევა. 
              მე მზად ვარ ამ მომავლისთვის, რადგან შენ ხარ ჩემთან. 💕
            </p>
          </div>

          <button (click)="reset()" class="restart-btn">
            თავიდან დაწყება
          </button>
        </div>
      </div>

      <!-- Background elements -->
      <div class="floating-elements">
        <div class="element">🏠</div>
        <div class="element">🐶</div>
        <div class="element">🌍</div>
        <div class="element">🚗</div>
        <div class="element">💖</div>
        <div class="element">✨</div>
      </div>
    </div>
  `,
  styles: [`
    .future-page {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
      padding: 40px 20px;
      position: relative;
      overflow: hidden;
    }

    .content {
      max-width: 1200px;
      width: 100%;
      z-index: 10;
    }

    .title {
      font-family: var(--font-serif);
      font-size: 4rem;
      color: white;
      text-align: center;
      margin-bottom: 60px;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      animation: fadeInDown 0.8s ease-out;
    }

    .categories {
      .category-section {
        margin-bottom: 50px;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(20px);
        border-radius: 30px;
        padding: 40px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        animation: fadeInUp 0.8s ease-out;

        .category-title {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: white;
          text-align: center;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;

          .category-icon {
            font-size: 3rem;
          }
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;

          .option-card {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 3px solid transparent;

            &:hover {
              transform: translateY(-10px);
              background: rgba(255, 255, 255, 0.3);
              box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
            }

            &.selected {
              border-color: #ffd700;
              background: rgba(255, 215, 0, 0.3);
              box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
              transform: scale(1.05);
            }

            .option-emoji {
              font-size: 4rem;
              margin-bottom: 15px;
            }

            .option-name {
              font-family: var(--font-serif);
              font-size: 1.3rem;
              color: white;
              font-weight: 600;
            }
          }
        }
      }
    }

    .generate-btn {
      display: block;
      margin: 50px auto 0;
      padding: 20px 60px;
      font-size: 1.8rem;
      background: linear-gradient(135deg, #ffd700, #ffed4e);
      color: #333;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-family: var(--font-sans);
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 10px 40px rgba(255, 215, 0, 0.5);
      animation: pulse 2s ease-in-out infinite;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 15px 50px rgba(255, 215, 0, 0.7);
      }
    }

    .future-result {
      text-align: center;
      animation: fadeInScale 0.8s ease-out;

      .result-animation {
        position: relative;
        height: 100px;
        margin-bottom: 30px;

        .sparkle {
          position: absolute;
          font-size: 4rem;
          animation: sparkleAnimation 2s ease-in-out infinite;

          &:nth-child(1) {
            left: 30%;
            animation-delay: 0s;
          }
          &:nth-child(2) {
            left: 50%;
            animation-delay: 0.5s;
          }
          &:nth-child(3) {
            left: 70%;
            animation-delay: 1s;
          }
        }
      }

      .result-title {
        font-family: var(--font-serif);
        font-size: 3.5rem;
        color: white;
        margin-bottom: 50px;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .future-vision {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        margin-bottom: 50px;

        .vision-item {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 40px 30px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          }

          .vision-icon {
            font-size: 4rem;
            display: block;
            margin-bottom: 20px;
          }

          .vision-text {
            font-family: var(--font-serif);
            font-size: 1.5rem;
            color: white;
            line-height: 1.8;
          }
        }
      }

      .final-future-message {
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(20px);
        border-radius: 30px;
        padding: 50px 40px;
        margin-bottom: 40px;
        border: 2px solid rgba(255, 255, 255, 0.4);

        p {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: white;
          line-height: 2;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
      }

      .restart-btn {
        padding: 15px 50px;
        font-size: 1.3rem;
        background: rgba(255, 255, 255, 0.3);
        color: white;
        border: 2px solid white;
        border-radius: 25px;
        cursor: pointer;
        font-family: var(--font-sans);
        font-weight: bold;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: translateY(-3px);
        }
      }
    }

    .floating-elements {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      overflow: hidden;

      .element {
        position: absolute;
        font-size: 3rem;
        opacity: 0.2;
        animation: floatElement 20s linear infinite;

        &:nth-child(1) { left: 10%; animation-delay: 0s; }
        &:nth-child(2) { left: 25%; animation-delay: 3s; }
        &:nth-child(3) { left: 40%; animation-delay: 6s; }
        &:nth-child(4) { left: 55%; animation-delay: 9s; }
        &:nth-child(5) { left: 70%; animation-delay: 12s; }
        &:nth-child(6) { left: 85%; animation-delay: 15s; }
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

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    @keyframes sparkleAnimation {
      0%, 100% {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
      50% {
        transform: translateY(-20px) scale(1.2);
        opacity: 0.7;
      }
    }

    @keyframes floatElement {
      0% {
        bottom: -10%;
        transform: translateX(0) rotate(0deg);
      }
      100% {
        bottom: 110%;
        transform: translateX(100px) rotate(360deg);
      }
    }

    @media (max-width: 768px) {
      .title {
        font-size: 3rem;
        margin-bottom: 40px;
      }

      .categories .category-section {
        padding: 30px 20px;

        .category-title {
          font-size: 2rem;

          .category-icon {
            font-size: 2.5rem;
          }
        }

        .options-grid {
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;

          .option-card {
            padding: 25px 15px;

            .option-emoji {
              font-size: 3rem;
            }

            .option-name {
              font-size: 1.1rem;
            }
          }
        }
      }

      .generate-btn {
        font-size: 1.5rem;
        padding: 18px 40px;
      }

      .future-result {
        .result-title {
          font-size: 2.5rem;
        }

        .future-vision {
          grid-template-columns: 1fr;
          gap: 20px;

          .vision-item {
            padding: 30px 25px;

            .vision-icon {
              font-size: 3rem;
            }

            .vision-text {
              font-size: 1.3rem;
            }
          }
        }

        .final-future-message {
          padding: 40px 30px;

          p {
            font-size: 1.6rem;
          }
        }
      }
    }

    @media (max-width: 480px) {
      .title {
        font-size: 2.5rem;
      }

      .categories .category-section {
        .category-title {
          font-size: 1.8rem;
          flex-direction: column;
          gap: 10px;
        }

        .options-grid {
          grid-template-columns: repeat(2, 1fr);

          .option-card {
            .option-emoji {
              font-size: 2.5rem;
            }

            .option-name {
              font-size: 1rem;
            }
          }
        }
      }

      .future-result {
        .result-title {
          font-size: 2rem;
        }

        .final-future-message p {
          font-size: 1.4rem;
        }
      }
    }
  `]
})
export class FuturePageComponent {
  selectedChoices: SelectedChoices = {};
  showResult = false;

  futureChoices: FutureChoice[] = [
    {
      category: 'house',
      categoryGeo: 'სახლი',
      icon: '🏡',
      options: [
        { id: 'cozy', name: 'Cozy House', nameGeo: 'მყუდრო სახლი', emoji: '🏡' },
        { id: 'modern', name: 'Modern Apartment', nameGeo: 'თანამედროვე ბინა', emoji: '🏢' },
        { id: 'villa', name: 'Villa', nameGeo: 'ვილა', emoji: '🏰' },
        { id: 'countryside', name: 'Countryside', nameGeo: 'სოფლის სახლი', emoji: '🌾' }
      ]
    },
    {
      category: 'pet',
      categoryGeo: 'შინაური ცხოველი',
      icon: '🐾',
      options: [
        { id: 'dog', name: 'Dog', nameGeo: 'ძაღლი', emoji: '🐶' },
        { id: 'cat', name: 'Cat', nameGeo: 'კატა', emoji: '🐱' },
        { id: 'both', name: 'Both', nameGeo: 'ორივე', emoji: '🐕🐈' },
        { id: 'other', name: 'Other', nameGeo: 'სხვა', emoji: '🐰' }
      ]
    },
    {
      category: 'country',
      categoryGeo: 'ქვეყანა',
      icon: '🌍',
      options: [
        { id: 'georgia', name: 'Georgia', nameGeo: 'საქართველო', emoji: '🇬🇪' },
        { id: 'europe', name: 'Europe', nameGeo: 'ევროპა', emoji: '🇪🇺' },
        { id: 'usa', name: 'USA', nameGeo: 'ამერიკა', emoji: '🇺🇸' },
        { id: 'travel', name: 'Travel Everywhere', nameGeo: 'ყველგან მოგზაურობა', emoji: '✈️' }
      ]
    },
    {
      category: 'car',
      categoryGeo: 'მანქანა',
      icon: '🚗',
      options: [
        { id: 'suv', name: 'SUV', nameGeo: 'ჯიპი', emoji: '🚙' },
        { id: 'sports', name: 'Sports Car', nameGeo: 'სპორტული', emoji: '🏎️' },
        { id: 'electric', name: 'Electric', nameGeo: 'ელექტრო', emoji: '⚡' },
        { id: 'classic', name: 'Classic', nameGeo: 'კლასიკური', emoji: '🚗' }
      ]
    }
  ];

  futureMessages: { [key: string]: { [key: string]: string } } = {
    house: {
      cozy: 'ჩვენი მყუდრო სახლი, სადაც ყოველი კუთხე სავსეა სიყვარულით და სითბოთ.',
      modern: 'თანამედროვე ბინა ქალაქის ცენტრში, სადაც ერთად დავიწყებთ ახალ ცხოვრებას.',
      villa: 'ლამაზი ვილა ბაღით, სადაც ერთად გავზრდით ჩვენს ოჯახს.',
      countryside: 'სოფლის სახლი ბუნების ხმებით, სადაც დრო ჩვენთვის შეჩერდება.'
    },
    pet: {
      dog: 'ერთგული ძაღლი, რომელიც ჩვენი ოჯახის წევრი გახდება.',
      cat: 'საყვარელი კატა, რომელიც სახლს კიდევ უფრო მყუდროს გახდის.',
      both: 'ძაღლი და კატა - ჩვენი პატარა ზოოპარკი სავსე სიყვარულით.',
      other: 'სპეციალური შინაური ცხოველი, რომელსაც ერთად მოვუვლით.'
    },
    country: {
      georgia: 'საქართველოში, ჩვენს სამშობლოში, ოჯახთან და მეგობრებთან ახლოს.',
      europe: 'ევროპაში, სადაც ახალი თავგადასავლები გველოდება.',
      usa: 'ამერიკაში, ოცნებების ქვეყანაში, ახალი შესაძლებლობებით.',
      travel: 'მთელ მსოფლიოში მოგზაურობა, ყოველი ქვეყანა ჩვენი სახლია.'
    },
    car: {
      suv: 'დიდი ჯიპი ოჯახური მოგზაურობებისთვის და თავგადასავლებისთვის.',
      sports: 'სპორტული მანქანა სწრაფი და მაღელვებელი მოგზაურობებისთვის.',
      electric: 'ელექტრო მანქანა - ეკოლოგიურად სუფთა მომავლისთვის.',
      classic: 'კლასიკური მანქანა სტილითა და ელეგანტურობით.'
    }
  };

  selectOption(category: string, optionId: string, optionName: string): void {
    this.selectedChoices[category as keyof SelectedChoices] = optionId;
  }

  isSelected(category: string, optionId: string): boolean {
    return this.selectedChoices[category as keyof SelectedChoices] === optionId;
  }

  allChoicesMade(): boolean {
    return Object.keys(this.selectedChoices).length === 4;
  }

  generateFuture(): void {
    this.showResult = true;
  }

  getFutureMessage(category: string): string {
    const choice = this.selectedChoices[category as keyof SelectedChoices];
    return choice ? this.futureMessages[category][choice] : '';
  }

  reset(): void {
    this.selectedChoices = {};
    this.showResult = false;
  }
}
