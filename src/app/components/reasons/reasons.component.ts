import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reasons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reasons.component.html',
  styleUrl: './reasons.component.scss'
})
export class ReasonsComponent {
  reasons = [
    { title: 'შენი ღიმილი', text: 'სამყაროს მანათებს' },
    { title: 'შენი თვალები', text: 'ჩემთვის სახლია' },
    { title: 'შენს გვერდით', text: 'დრო ჩერდება' },
    { title: 'შენი სილამაზე', text: 'დაუჯერებელია' },
    { title: 'შენ ხარ', text: 'ჩემი შთაგონება' },
    { title: 'შენ ხარ', text: 'ჩემი ბედნიერება' }
  ];
}
