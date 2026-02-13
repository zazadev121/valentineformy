import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, AfterViewInit {
  @ViewChild('heartsContainer') heartsContainer!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createHearts();
  }

  createHearts(): void {
    const container = this.heartsContainer.nativeElement;
    const heartCount = 30;

    for (let i = 0; i < heartCount; i++) {
        const heart = this.renderer.createElement('div');
        this.renderer.addClass(heart, 'heart-shape');
        
        // Random properties
        const size = Math.random() * 20 + 10; // 10px to 30px
        const left = Math.random() * 100; // 0% to 100%
        const animationDuration = Math.random() * 10 + 5; // 5s to 15s
        const delay = Math.random() * 5;

        this.renderer.setStyle(heart, 'width', `${size}px`);
        this.renderer.setStyle(heart, 'height', `${size}px`);
        this.renderer.setStyle(heart, 'left', `${left}%`);
        this.renderer.setStyle(heart, 'animation-duration', `${animationDuration}s`);
        this.renderer.setStyle(heart, 'animation-delay', `-${delay}s`); // Negative delay to start mid-animation
        
        this.renderer.appendChild(container, heart);
    }
  }

  scrollToLoveStory() {
    const element = document.getElementById('love-story');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
