import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

interface Card {
  id: number;
  image: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-game.component.html',
  styleUrl: './memory-game.component.scss'
})
export class MemoryGameComponent implements OnInit {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  moves = 0;
  isGameOver = false;
  lockBoard = false;

  // Utilize the user's photos for the game!
  private images = [
    'assets/images/her.jpg',
    'assets/images/marriiii.jpg',
    'assets/images/love.jpg',
    'assets/images/myyy.jpg',
    'assets/images/mari.jpg',
    'assets/images/Car.jpg' // Added a 6th one if available or use a repeat/heart
  ];

  ngOnInit() {
    this.startNewGame();
  }

  startNewGame() {
    this.isGameOver = false;
    this.moves = 0;
    this.flippedCards = [];
    this.lockBoard = false;
    
    // Create pairs (6 images * 2 = 12 cards)
    // If Car.jpg doesn't exist, it might show blank/broken, but we saw it in file list.
    const deck = [...this.images, ...this.images];
    
    this.cards = deck
      .map((img, index) => ({
        id: index,
        image: img,
        flipped: false,
        matched: false
      }))
      .sort(() => Math.random() - 0.5); // Shuffle
  }

  flipCard(card: Card) {
    if (this.lockBoard || card.flipped || card.matched) return;

    card.flipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
  }

  checkForMatch() {
    this.lockBoard = true;
    this.moves++;
    const [card1, card2] = this.flippedCards;

    if (card1.image === card2.image) {
      card1.matched = true;
      card2.matched = true;
      this.flippedCards = [];
      this.lockBoard = false;
      this.checkVictory();
    } else {
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        this.flippedCards = [];
        this.lockBoard = false;
      }, 1000);
    }
  }

  checkVictory() {
    if (this.cards.every(c => c.matched)) {
      this.isGameOver = true;
      this.triggerConfetti();
    }
  }

  triggerConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }
}
