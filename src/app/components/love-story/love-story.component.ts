import { Component, ElementRef, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-love-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './love-story.component.html',
  styleUrl: './love-story.component.scss'
})
export class LoveStoryComponent implements AfterViewInit {
  @ViewChildren('anim') animElements!: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, { threshold: 0.2 });

    this.animElements.forEach(el => observer.observe(el.nativeElement));
  }
}
