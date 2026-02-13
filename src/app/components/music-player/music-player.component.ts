import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var YT: any;

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss'
})
export class MusicPlayerComponent implements OnInit {
  isPlaying = false;
  player: any;
  videoId = 'F3RRwbgkbUM'; // Oceans - Hillsong

  ngOnInit() {
    this.initYouTubePlayer();
  }

  initYouTubePlayer() {
    if ((window as any).YT && (window as any).YT.Player) {
      this.createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = () => {
        this.createPlayer();
      };
    }
  }

  createPlayer() {
    this.player = new YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: this.videoId,
      playerVars: {
        'autoplay': 0, // Auto-play usually blocked by browsers without interaction
        'controls': 0,
        'loop': 1,
        'playlist': this.videoId 
      },
      events: {
        'onReady': (event: any) => {
          // Player is ready
          // We can try to play if user already interacted, but safer to wait for button click
        },
        'onStateChange': (event: any) => {
           if (event.data === YT.PlayerState.PLAYING) {
             this.isPlaying = true;
           } else if (event.data === YT.PlayerState.PAUSED) {
             this.isPlaying = false;
           }
        }
      }
    });
  }

  togglePlay() {
    if (!this.player) return;

    if (this.isPlaying) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
    this.isPlaying = !this.isPlaying;
  }
}
