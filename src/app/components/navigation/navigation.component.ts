import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navigation" [class.open]="isMenuOpen">
      <!-- Mobile hamburger -->
      <button class="hamburger" (click)="toggleMenu()" [class.active]="isMenuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation links -->
      <div class="nav-links" [class.show]="isMenuOpen">
        <a routerLink="/home" routerLinkActive="active" (click)="closeMenu()">
          <span class="icon">🏠</span>
          <span class="text">მთავარი</span>
        </a>
        <a routerLink="/love-story" routerLinkActive="active" (click)="closeMenu()">
          <span class="icon">💕</span>
          <span class="text">ჩვენი ისტორია</span>
        </a>
        <a routerLink="/reasons" routerLinkActive="active" (click)="closeMenu()">
          <span class="icon">💝</span>
          <span class="text">მიზეზები</span>
        </a>
        <a routerLink="/gallery" routerLinkActive="active" (click)="closeMenu()">
          <span class="icon">📸</span>
          <span class="text">გალერეა</span>
        </a>
        <a routerLink="/quiz" routerLinkActive="active" (click)="closeMenu()">
          <span class="icon">🎮</span>
          <span class="text">ვიქტორინა</span>
        </a>
        <a routerLink="/date-night" routerLinkActive="active" (click)="closeMenu()">
          <span class="icon">💑</span>
          <span class="text">შეხვედრა</span>
        </a>
        <a routerLink="/comfort" routerLinkActive="active" (click)="closeMenu()">
          <span class="icon">🤗</span>
          <span class="text">ნუგეში</span>
        </a>
        <a routerLink="/world-without-you" routerLinkActive="active" (click)="closeMenu()">
          <span class="icon">🌈</span>
          <span class="text">შენი ფერი</span>
        </a>
        <a routerLink="/future" routerLinkActive="active" (click)="closeMenu()">
          <span class="icon">🏰</span>
          <span class="text">ჩვენი მომავალი</span>
        </a>
        <a routerLink="/ai-garden" routerLinkActive="active" (click)="closeMenu()">
          <span class="icon">🤖</span>
          <span class="text">AI ბაღი</span>
        </a>
        <a routerLink="/final" routerLinkActive="active" (click)="closeMenu()">
          <span class="icon">💌</span>
          <span class="text">ბოლო შეტყობინება</span>
        </a>
        <!-- Secret link - subtle hint -->
        <a routerLink="/secret" routerLinkActive="active" class="secret-link" (click)="closeMenu()">
          <span class="icon">🎁</span>
          <span class="text">???</span>
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .navigation {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(15px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 20px rgba(255, 77, 109, 0.1);
      z-index: 1000;
      padding: 15px 0;
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1001;

      span {
        width: 25px;
        height: 3px;
        background: var(--primary-color);
        border-radius: 3px;
        transition: all 0.3s ease;
      }

      &.active {
        span:nth-child(1) {
          transform: rotate(45deg) translateY(8px);
        }
        span:nth-child(2) {
          opacity: 0;
        }
        span:nth-child(3) {
          transform: rotate(-45deg) translateY(-8px);
        }
      }
    }

    .nav-links {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      padding: 0 20px;

      a {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 25px;
        text-decoration: none;
        color: var(--text-color);
        font-family: var(--font-sans);
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        border: 2px solid transparent;

        .icon {
          font-size: 1.3rem;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 77, 109, 0.2);
        }

        &.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--accent-color);
          box-shadow: 0 5px 20px rgba(255, 77, 109, 0.4);
        }
      }

      .secret-link {
        background: rgba(201, 24, 74, 0.1);
        border: 2px dashed rgba(201, 24, 74, 0.3);

        &:hover {
          background: rgba(201, 24, 74, 0.2);
          border-style: solid;
        }

        &.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-color: #667eea;
        }
      }
    }

    @media (max-width: 1024px) {
      .nav-links {
        gap: 8px;

        a {
          padding: 8px 15px;
          font-size: 0.9rem;

          .text {
            display: none;
          }

          .icon {
            font-size: 1.5rem;
          }
        }
      }
    }

    @media (max-width: 768px) {
      .hamburger {
        display: flex;
      }

      .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        padding: 0;
        gap: 15px;
        max-height: 0;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-20px);
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

        &.show {
          max-height: 100vh;
          padding: 30px 20px;
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        a {
          width: 100%;
          justify-content: center;
          padding: 15px 25px;
          font-size: 1.1rem;

          .text {
            display: inline;
          }
        }
      }
    }

    @media (max-width: 480px) {
      .nav-links a {
        padding: 12px 20px;
        font-size: 1rem;
      }
    }
  `]
})
export class NavigationComponent {
  isMenuOpen = false;

  constructor(private router: Router) {
    // Close menu on route change
    this.router.events.subscribe(() => {
      this.isMenuOpen = false;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
