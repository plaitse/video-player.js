import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../services/api-client.service';
import { State } from '../services/state.service';

interface History {
  url: string;
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

  constructor(private apiClient: ApiClient, private state: State) {}

  public async loadHistories(): Promise<void> {
    try {
      this.histories = await this.apiClient.get<History[]>({
        url: 'http://localhost:8000/history',
      });

      window.localStorage.setItem('monChat', 'Tom');

      console.warn('this.histories : ', this.histories);
    } catch (err) {
      console.error(err);
    }
  }

  public toggleBookmarks() {
    this.bookmarksDisplayed = !this.bookmarksDisplayed;
  }
}
