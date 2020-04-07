import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../services/state.service';
import { ClientApi } from 'src/services/client-api.service';
import {
  History,
  historyLocalStorage,
  historyRoute,
  historyLocalStorageError,
} from '../components/history/history.component';
import {
  bookmarksLocalStorage,
  bookmarksLocalStorageError,
} from 'src/components/bookmarks/bookmarks.component';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.html',
  styleUrls: ['./app-root.css'],
})
export class AppRoot implements OnInit {
  // Observer on the following variables
  public showBookmarks: Observable<boolean> = this.state.showBookmarks$;
  public showHistory: Observable<boolean> = this.state.showHistory$;
  public url: Observable<string> = this.state.url$;

  constructor(private clientApi: ClientApi, private state: State) {}

  /**
   * Fetch all histories on component's init and store them in the localStorage
   */
  public async ngOnInit() {
    this.state.showBookmarks = false;
    await this.fetchAndStoreHistories();
  }

  /**
   * Get histories from database and store them in the localStorage
   */
  public async fetchAndStoreHistories() {
    const histories: History[] = await this.clientApi.get<History[]>({
      route: historyRoute,
    });
    console.warn('Histories fetched : ', histories);

    if (!histories.length) {
      // Reset bookmarks if no history is stored in the database
      this.resetBookmarks();
    }

    // Store the histories in the localStorage
    this.storeUrlInLocalStorage(histories);

    // Display the history panel
    this.state.showHistory = true;
  }

  /**
   * Reset bookmarks URL from the localStorage to empty the bookmarks panel
   */
  public resetBookmarks() {
    try {
      window.localStorage.setItem(bookmarksLocalStorage, '[]');
    } catch (err) {
      throw new Error(bookmarksLocalStorageError + err);
    }
  }

  /**
   * Store the new history in the localStorage
   */
  public storeUrlInLocalStorage(histories) {
    try {
      window.localStorage.setItem(
        historyLocalStorage,
        JSON.stringify(histories)
      );
    } catch (err) {
      throw new Error(historyLocalStorageError + err);
    }
  }

  /**
   * Show or hide bookmarks panel
   */
  public toggleBookmarks() {
    this.state.showBookmarks = !this.state.showBookmarks;
  }
}
