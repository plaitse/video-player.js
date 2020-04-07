import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../services/state.service';
import { ClientApi } from 'src/services/client-api.service';
import {
  History,
  historyLocalStorage,
  historyRoute,
} from '../components/history/history.component';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.html',
  styleUrls: ['./app-root.css'],
})
export class AppRoot implements OnInit {
  public bookmarksDisplayed: boolean = false;
  public url: Observable<string> = this.state.url$;
  public showHistory: Observable<boolean> = this.state.showHistory$;

  constructor(private clientApi: ClientApi, private state: State) {}

  /**
   * Fetch all histories on component's init and store them in the localStorage
   */
  public async ngOnInit() {
    await this.fetchAndStoreHistories();
  }

  /**
   * Get histories from database and store them in the localStorage
   */
  public async fetchAndStoreHistories() {
    try {
      const histories: History[] = await this.clientApi.get<History[]>({
        route: historyRoute,
      });
      console.warn('length :', histories.length);
      console.warn('histories :', histories);
      this.storeUrlInLocalStorage(histories);
      this.state.showHistory = true;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Store the new history in the localStorage
   */
  public storeUrlInLocalStorage(histories) {
    window.localStorage.setItem(historyLocalStorage, JSON.stringify(histories));
  }

  /**
   * Show or hide bookmarks panel
   */
  public toggleBookmarks() {
    this.bookmarksDisplayed = !this.bookmarksDisplayed;
  }
}
