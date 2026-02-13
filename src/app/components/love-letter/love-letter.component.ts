import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-love-letter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="love-letter-section container">
      <div class="letter-content glass-card">
        <h2>მარიამ, ჩემო სიცოცხლე! ❤️</h2>
        <p>
          გილოცავ ამ დღეს! 16 წელი ველოდი იმ დღეს, როცა გვერდში მეყოლებოდი და ეს დღეც დადგა. 
          ვიცი, რომ ეს ის ვალენტინობის დღეა, რომელსაც წლები ველოდი.
        </p>
        <p>
          აუუ, რა ძალიან მიყვარხარ! იმედია, ეს პირველია და კიდევ მრავალ ვალენტინობას დავესწრებით ერთად. 
          შენ ჩემი სიცოცხლის მიზეზი ხარ, გულოოო! 🌹
        </p>
        <p>
          შენ ხარ ჩემი ოცნება, რომელიც ახდა. ყოველი წამი შენთან ერთად არის საჩუქარი. 
          მინდა მთელი სამყარო შენს ფეხებთან დავაწყო. შენ ხარ ჩემი ყველაფერი! ✨
        </p>
        <div class="signature">სამუდამოდ შენი ❤️</div>
      </div>
    </section>
  `,
  styles: [`
    .love-letter-section {
      padding: 80px 20px;
      text-align: center;
    }
    @media (max-width: 768px) {
      .love-letter-section {
        padding: 60px 15px;
      }
    }
    @media (max-width: 480px) {
      .love-letter-section {
        padding: 40px 10px;
      }
    }
    .letter-content {
      max-width: 900px;
      margin: 0 auto;
      padding: 60px 40px;
      text-align: left;
      border: 2px solid rgba(255, 255, 255, 0.6);
    }
    @media (max-width: 768px) {
      .letter-content {
        padding: 40px 30px;
      }
    }
    @media (max-width: 480px) {
      .letter-content {
        padding: 30px 20px;
      }
    }
    h2 {
      font-size: 3.5rem; /* Bigger title */
      color: var(--accent-color);
      margin-bottom: 40px;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }
    @media (max-width: 768px) {
      h2 {
        font-size: 2.8rem;
        margin-bottom: 30px;
      }
    }
    @media (max-width: 480px) {
      h2 {
        font-size: 2.2rem;
        margin-bottom: 20px;
      }
    }
    p {
      font-size: 1.8rem; /* Bigger body text */
      line-height: 1.6;
      color: var(--text-color);
      margin-bottom: 30px;
      font-family: var(--font-serif);
      font-weight: 500;
    }
    @media (max-width: 768px) {
      p {
        font-size: 1.5rem;
        margin-bottom: 25px;
      }
    }
    @media (max-width: 480px) {
      p {
        font-size: 1.2rem;
        margin-bottom: 20px;
        line-height: 1.5;
      }
    }
    .signature {
      font-size: 2.5rem; /* Bigger signature */
      font-weight: bold;
      text-align: right;
      margin-top: 50px;
      color: var(--primary-color);
      font-family: var(--font-serif);
    }
    @media (max-width: 768px) {
      .signature {
        font-size: 2rem;
        margin-top: 40px;
      }
    }
    @media (max-width: 480px) {
      .signature {
        font-size: 1.6rem;
        margin-top: 30px;
      }
    }
  `]
})
export class LoveLetterComponent {}
