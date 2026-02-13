import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { ClickToStartComponent } from './components/click-to-start/click-to-start.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MusicPlayerComponent,
    ClickToStartComponent,
    NavigationComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'valentine-mariam';
  showNavigation = true;
  
  @ViewChild(MusicPlayerComponent) musicPlayer!: MusicPlayerComponent;

  constructor(private router: Router) {
    // Hide navigation on security gate page
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showNavigation = event.url !== '/';
      });
  }

  onStart() {
    // Attempt to play music when user interacts
    if (this.musicPlayer) {
      this.musicPlayer.togglePlay();
    }
  }
}
