import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateService, DateBooking } from '../../services/date/date.service';

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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="date-night-page">
      <div class="content">
        <h1 class="title" *ngIf="!selectedOption && !showBookingForm">აირჩიე ჩვენი შეხვედრა 💑</h1>
        
        <!-- Date Options Grid -->
        <div class="options-grid" *ngIf="!selectedOption && !showBookingForm">
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

        <!-- Response Container -->
        <div class="response-container" *ngIf="selectedOption && !showBookingForm">
          <div class="selected-icon">{{ selectedOption.icon }}</div>
          <h2 class="selected-title">{{ selectedOption.titleGeo }}</h2>
          <p class="response-text">{{ selectedOption.response }}</p>
          
          <div class="action-buttons">
            <button (click)="openBookingForm()" class="book-btn">
              დაჯავშნე ეს დეითი 📅
            </button>
            <button (click)="reset()" class="back-btn">
              აირჩიე სხვა ვარიანტი
            </button>
          </div>
        </div>

        <!-- Booking Form -->
        <div class="booking-form-container" *ngIf="showBookingForm">
          <h2 class="form-title">დაჯავშნე შენი დეითი 💖</h2>
          
          <div class="selected-date-info">
            <span class="info-icon">{{ selectedOption?.icon }}</span>
            <span class="info-text">{{ selectedOption?.titleGeo }}</span>
          </div>

          <form class="booking-form" (ngSubmit)="submitBooking()">
            <div class="form-group">
              <label>თარიღი და დრო</label>
              <input 
                type="datetime-local" 
                [(ngModel)]="bookingDateTime"
                name="dateTime"
                required
                class="form-input"
              />
            </div>

            <div class="success-message" *ngIf="bookingSuccess">
              ✅ დეითი წარმატებით დაიჯავშნა! 💕
            </div>

            <div class="error-message" *ngIf="bookingError">
              ❌ დაფიქსირდა შეცდომა. გთხოვთ სცადოთ ხელახლა.
            </div>

            <div class="form-buttons">
              <button type="submit" class="submit-btn" [disabled]="isSubmitting">
                {{ isSubmitting ? 'იტვირთება...' : 'დაჯავშნა' }}
              </button>
              <button type="button" (click)="cancelBooking()" class="cancel-btn">
                გაუქმება
              </button>
            </div>
          </form>

          <!-- Existing Bookings -->
          <div class="existing-bookings" *ngIf="existingBookings.length > 0">
            <h3>დაჯავშნილი დეითები:</h3>
            <div class="booking-list">
              <div *ngFor="let booking of existingBookings" class="booking-item">
                <span class="booking-icon">{{ getIconForDateIdea(booking.DateIdea) }}</span>
                <div class="booking-details">
                  <p class="booking-idea">{{ booking.DateIdea }}</p>
                  <p class="booking-time">{{ formatDateTime(booking.DateTime) }}</p>
                </div>
                <button (click)="deleteBooking(booking.id!)" class="delete-btn">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating hearts -->
      <div class="floating-hearts">
        <div class="heart">❤️</div>
        <div class="heart">❤️</div>
        <div class="heart">❤️</div>
        <div class="heart">❤️</div>
        <div class="heart">❤️</div>
        <div class="heart">❤️</div>
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

      .action-buttons {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .book-btn {
        padding: 18px 45px;
        font-size: 1.3rem;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 25px;
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

    .booking-form-container {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(20px);
      border-radius: 30px;
      padding: 50px 40px;
      border: 2px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 20px 60px rgba(255, 77, 109, 0.3);
      animation: fadeInScale 0.6s ease-out;

      .form-title {
        font-family: var(--font-serif);
        font-size: 2.5rem;
        color: var(--accent-color);
        text-align: center;
        margin-bottom: 30px;
      }

      .selected-date-info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin-bottom: 40px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 20px;

        .info-icon {
          font-size: 3rem;
        }

        .info-text {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--text-color);
          font-weight: bold;
        }
      }

      .booking-form {
        .form-group {
          margin-bottom: 25px;

          label {
            display: block;
            font-family: var(--font-serif);
            font-size: 1.3rem;
            color: var(--text-color);
            margin-bottom: 10px;
            font-weight: 600;
          }

          .form-input {
            width: 100%;
            padding: 15px 20px;
            font-size: 1.2rem;
            border: 2px solid rgba(255, 77, 109, 0.3);
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.8);
            color: var(--text-color);
            font-family: var(--font-sans);
            transition: all 0.3s ease;

            &:focus {
              outline: none;
              border-color: var(--primary-color);
              box-shadow: 0 0 20px rgba(255, 77, 109, 0.3);
            }
          }
        }

        .success-message {
          padding: 15px 20px;
          background: rgba(76, 175, 80, 0.2);
          border: 2px solid rgba(76, 175, 80, 0.5);
          border-radius: 15px;
          color: #2e7d32;
          font-size: 1.2rem;
          margin-bottom: 20px;
          text-align: center;
          animation: fadeIn 0.5s ease-out;
        }

        .error-message {
          padding: 15px 20px;
          background: rgba(244, 67, 54, 0.2);
          border: 2px solid rgba(244, 67, 54, 0.5);
          border-radius: 15px;
          color: #c62828;
          font-size: 1.2rem;
          margin-bottom: 20px;
          text-align: center;
          animation: fadeIn 0.5s ease-out;
        }

        .form-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 30px;

          .submit-btn {
            padding: 15px 40px;
            font-size: 1.3rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-family: var(--font-sans);
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 5px 20px rgba(255, 77, 109, 0.4);

            &:hover:not(:disabled) {
              background: var(--accent-color);
              transform: translateY(-3px);
              box-shadow: 0 8px 30px rgba(255, 77, 109, 0.6);
            }

            &:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }
          }

          .cancel-btn {
            padding: 15px 40px;
            font-size: 1.3rem;
            background: #95a5a6;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-family: var(--font-sans);
            font-weight: bold;
            transition: all 0.3s ease;

            &:hover {
              background: #7f8c8d;
              transform: translateY(-3px);
            }
          }
        }
      }

      .existing-bookings {
        margin-top: 50px;
        padding-top: 30px;
        border-top: 2px solid rgba(255, 77, 109, 0.2);

        h3 {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--accent-color);
          margin-bottom: 25px;
          text-align: center;
        }

        .booking-list {
          display: flex;
          flex-direction: column;
          gap: 15px;

          .booking-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 15px;
            transition: all 0.3s ease;

            &:hover {
              background: rgba(255, 255, 255, 0.7);
              transform: translateX(5px);
            }

            .booking-icon {
              font-size: 2.5rem;
            }

            .booking-details {
              flex: 1;

              .booking-idea {
                font-family: var(--font-serif);
                font-size: 1.3rem;
                color: var(--text-color);
                font-weight: 600;
                margin-bottom: 5px;
              }

              .booking-time {
                font-size: 1.1rem;
                color: rgba(89, 13, 34, 0.7);
              }
            }

            .delete-btn {
              background: none;
              border: none;
              font-size: 1.8rem;
              cursor: pointer;
              transition: transform 0.3s ease;

              &:hover {
                transform: scale(1.2);
              }
            }
          }
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

        &:nth-child(1) { left: 15%; animation-delay: 0s; }
        &:nth-child(2) { left: 30%; animation-delay: 2s; }
        &:nth-child(3) { left: 45%; animation-delay: 4s; }
        &:nth-child(4) { left: 60%; animation-delay: 6s; }
        &:nth-child(5) { left: 75%; animation-delay: 8s; }
        &:nth-child(6) { left: 90%; animation-delay: 10s; }
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

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
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

        .action-buttons {
          flex-direction: column;
        }
      }

      .booking-form-container {
        padding: 40px 30px;

        .form-title {
          font-size: 2rem;
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

      .booking-form-container {
        padding: 30px 20px;

        .form-title {
          font-size: 1.8rem;
        }

        .selected-date-info {
          .info-icon {
            font-size: 2.5rem;
          }

          .info-text {
            font-size: 1.5rem;
          }
        }
      }
    }
  `]
})
export class DateNightPageComponent implements OnInit {
  selectedOption: DateOption | null = null;
  showBookingForm = false;
  bookingDateTime = '';
  isSubmitting = false;
  bookingSuccess = false;
  bookingError = false;
  existingBookings: DateBooking[] = [];

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

  constructor(private dateService: DateService) {}

  ngOnInit() {
    this.loadExistingBookings();
  }

  selectOption(option: DateOption): void {
    this.selectedOption = option;
  }

  openBookingForm(): void {
    this.showBookingForm = true;
    this.bookingSuccess = false;
    this.bookingError = false;
  }

  cancelBooking(): void {
    this.showBookingForm = false;
    this.bookingDateTime = '';
    this.bookingSuccess = false;
    this.bookingError = false;
  }

  submitBooking(): void {
    if (!this.selectedOption || !this.bookingDateTime) {
      return;
    }

    this.isSubmitting = true;
    this.bookingSuccess = false;
    this.bookingError = false;

    const booking: DateBooking = {
      DateIdea: this.selectedOption.titleGeo,
      DateTime: this.bookingDateTime
    };

    this.dateService.createDate(booking).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.bookingSuccess = true;
        this.bookingDateTime = '';
        this.loadExistingBookings();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.bookingSuccess = false;
        }, 3000);
      },
      error: (error) => {
        console.error('Booking error:', error);
        this.isSubmitting = false;
        this.bookingError = true;
        
        // Hide error message after 3 seconds
        setTimeout(() => {
          this.bookingError = false;
        }, 3000);
      }
    });
  }

  loadExistingBookings(): void {
    this.dateService.getAllDates().subscribe({
      next: (bookings) => {
        this.existingBookings = bookings;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
      }
    });
  }

  deleteBooking(id: string): void {
    if (confirm('დარწმუნებული ხარ, რომ გსურს ამ დეითის წაშლა?')) {
      this.dateService.deleteDate(id).subscribe({
        next: () => {
          this.loadExistingBookings();
        },
        error: (error) => {
          console.error('Error deleting booking:', error);
        }
      });
    }
  }

  getIconForDateIdea(dateIdea: string): string {
    const option = this.dateOptions.find(opt => opt.titleGeo === dateIdea);
    return option ? option.icon : '💖';
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString('ka-GE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  reset(): void {
    this.selectedOption = null;
    this.showBookingForm = false;
    this.bookingDateTime = '';
    this.bookingSuccess = false;
    this.bookingError = false;
  }
}
