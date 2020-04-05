import { Component, OnInit } from '@angular/core';
import { State } from '../../services/state.service';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css'],
})
export class VideoViewComponent implements OnInit {
  public url: Observable<string> = this.state.url$;
  public videoLoaded: boolean = false;

  constructor(private _sanitizer: DomSanitizer, private state: State) {}

  /**
   * Sanitize the URL received from input
   */
  formatSafeUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * Timeout loader for UX purpose, to show user the video is loading
   */
  ngOnInit() {
    setTimeout(() => {
      this.videoLoaded = true;
    }, 500);
  }
}
