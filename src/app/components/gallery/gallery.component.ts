import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  // Placeholders for now. User should replace these.
  images = [
    { src: 'assets/images/her.jpg', fallback: 'assets/images/placeholder1.jpg', caption: 'ჩემი სიცოცხლე' },
    { src: 'assets/images/marriiii.jpg', fallback: 'assets/images/placeholder2.jpg', caption: 'შენთან ყოფნა ბედნიერებაა' },
    { src: 'assets/images/love.jpg', fallback: 'assets/images/placeholder3.jpg', caption: 'ყველაზე ლამაზი' },
    { src: 'assets/images/myyy.jpg', fallback: 'assets/images/placeholder4.jpg', caption: 'მიყვარხარ უზომოდ' },
    { src: 'assets/images/mari.jpg', fallback: 'assets/images/placeholder5.jpg', caption: 'ჩემი სიყვარული' }
  ];

  handleImageError(event: any) {
    // If image fails to load, hide it or show a placeholder style
    event.target.style.display = 'none';
    event.target.parentElement.classList.add('fallback-style');
  }
}
