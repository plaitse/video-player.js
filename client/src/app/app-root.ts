import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../services/state.service';

interface History {
  videoUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app-root.html',
  styleUrls: ['./app-root.css'],
})
export class AppRoot {
  public bookmarksDisplayed: boolean = false;
  public histories: History[] = [];
  public url: Observable<string> = this.state.url$;

  constructor(private state: State) {}

  public toggleBookmarks() {
    this.bookmarksDisplayed = !this.bookmarksDisplayed;
  }
}
