import { Component, ElementRef, ViewChild, Renderer2, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValentineService } from '../../services/valentine/valentine.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-valentine-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './valentine-question.component.html',
  styleUrl: './valentine-question.component.scss'
})
export class ValentineQuestionComponent {
  @ViewChild('noBtn') noBtn!: ElementRef;
  accepted = false;
  loading = false;
  
  constructor(
    private valentineService: ValentineService,
    private renderer: Renderer2
  ) {}

  onYesClick() {
    this.loading = true;
    this.valentineService.sendResponse('YES').subscribe({
      next: () => {
        this.loading = false;
        this.accepted = true;
        this.triggerConfetti();
      },
      error: (err) => {
        console.error('API Error', err);
        // Even if API fails (e.g. CORS or network), we still show success for the user experience
        this.loading = false;
        this.accepted = true;
        this.triggerConfetti();
      }
    });
  }

  onNoHover() {
    // Make the button run away!
    const button = this.noBtn.nativeElement;
    
    // Get viewport dimensions
    const padding = 50; 
    const headerHeight = 100; // Keep below fixed navigation
    const maxX = window.innerWidth - button.clientWidth - padding;
    const maxY = window.innerHeight - button.clientHeight - padding;
    
    // Calculate random position within safe area
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(headerHeight, Math.floor(Math.random() * maxY));
    
    this.renderer.setStyle(button, 'position', 'fixed');
    this.renderer.setStyle(button, 'left', `${randomX}px`);
    this.renderer.setStyle(button, 'top', `${randomY}px`);
    this.renderer.setStyle(button, 'transition', 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)');
    this.renderer.setStyle(button, 'z-index', '9999');
  }

  triggerConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }
}
