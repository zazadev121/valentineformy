import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-final-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-message.component.html',
  styleUrl: './final-message.component.scss'
})
export class FinalMessageComponent {
  showSecret = false;

  revealSecret() {
    this.showSecret = true;
  }
}
