import { Component } from '@angular/core';
import { ClientApi } from '../../services/client-api.service';
import { State } from '../../services/state.service';
import {
  History,
  historyLocalStorage,
  historyLocalStorageError,
} from '../history/history.component';
import {
  bookmarksLocalStorage,
  bookmarksLocalStorageError,
} from '../bookmarks/bookmarks.component';

const youtubeWatchParser = 'watch?v=';
const youtubeEmbedParser = 'embed/';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  public bookmarkAvailable: boolean = false;
  public inputError: string = '';
  public url: string = '';

  constructor(private clientApi: ClientApi, private state: State) {}

  /**
   * Key handler:
   * - Only submit input if enter key is pressed
   * - Save URL if correct in global state to be accessible to other components
   */
  public async onKey(event: any) {
    this.resetInput();

    // No submit if key pressed differen than "enter"
    if (event.key !== 'Enter') {
      return;
    }

    // Parse complete URL to keep only the id
    const url: string[] = event.target.value.split(youtubeWatchParser);

    if (!url[1]) {
      // Information for UX
      this.inputError =
        'URL not recognized, please enter a correct YouTube URL';
      return;
    }

    // Store URL if correct
    await this.storeUrl(url[1]);
  }

  /**
   * Reset errors and input value
   */
  public resetInput() {
    this.bookmarkAvailable = false;
    this.inputError = '';
    this.state.url = '';
    this.url = '';
  }

  /**
   * Store bookmark in localStorage and update bookmarks panel
   */
  public saveBookmark() {
    if (!!this.state.url) {
      try {
        // Get histories from cache
        const bookmarksCached: string = window.localStorage.getItem(
          bookmarksLocalStorage
        );
        const bookmarks: string[] =
          (JSON.parse(bookmarksCached) as string[]) || [];

        // Truncate URL id
        const urlId: string = this.state.url.split(youtubeEmbedParser)[1];

        // Add new bookmark into cache
        bookmarks.push(urlId);
        window.localStorage.setItem(
          bookmarksLocalStorage,
          JSON.stringify(bookmarks)
        );

        this.updateBookmarksPanel();
      } catch (error) {
        throw new Error(bookmarksLocalStorageError);
      }
    }
  }

  /**
   * Save URL into bookmarks
   */
  public async storeUrl(url: string) {
    // Display button to save bookmarks
    this.bookmarkAvailable = true;
    // Store URL localy
    this.url = url;
    // Store URL in the state to be accessible for other components
    this.state.url = this.url;

    // Store URL in database
    const response: History = await this.storeUrlInDatabase();

    if (response && Object.values(response).length) {
      // Store URL in the localStorage
      this.storeUrlInLocalStorage(response);
      // Update the history panel
      this.updateHistoryPanel();
    }
  }

  /**
   * Store the URL in the database with a post request
   */
  public async storeUrlInDatabase() {
    if (!!this.state.url) {
      const response: History = await this.clientApi.post<History>({
        route: 'http://localhost:8000/history',
        videoUrl: this.url,
      });
      console.warn('New history stored in DB : ', response);
      return response;
    }
  }

  /**
   * Store the new history in the localStorage (to be improved)
   */
  public storeUrlInLocalStorage(newHistory: History) {
    try {
      // Get histories from cache
      const historyCached: string = window.localStorage.getItem(
        historyLocalStorage
      );
      const histories: History[] = JSON.parse(historyCached) as History[];

      // Add new history to cache
      histories.push(newHistory);
      window.localStorage.setItem(
        historyLocalStorage,
        JSON.stringify(histories)
      );
    } catch (err) {
      throw new Error(historyLocalStorageError + err);
    }
  }

  /**
   * Trick to update history panel with observable (to be improved)
   */
  public updateHistoryPanel() {
    this.state.showHistory = false;
    setTimeout(() => {
      this.state.showHistory = true;
    }, 1);
  }

  /**
   * Trick to update history panel with observable (to be improved)
   */
  public updateBookmarksPanel() {
    this.state.showBookmarks = false;
    setTimeout(() => {
      this.state.showBookmarks = true;
    }, 1);
  }
}
