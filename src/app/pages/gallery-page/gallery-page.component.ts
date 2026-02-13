import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from '../../components/gallery/gallery.component';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, GalleryComponent],
  template: `
    <div class="page">
      <app-gallery></app-gallery>
    </div>
  `,
  styles: [`
    .page {
      min-height: 100vh;
      padding: 40px 0;
    }
  `]
})
export class GalleryPageComponent {}
