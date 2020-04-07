import { Component } from '@angular/core';
import { ClientApi } from '../../services/client-api.service';
import { State } from '../../services/state.service';
import { History, historyLocalStorage } from '../history/history.component';

const youtubeParser = 'watch?v=';

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
   * Key handler
   * Only submit input if enter key is pressed
   * Save URL if correct in global state to be accessible to other components
   */
  public async onKey(event: any) {
    this.resetInput();

    if (event.key !== 'Enter') {
      return;
    }

    const url = event.target.value.split(youtubeParser);

    if (!url[1]) {
      this.inputError =
        'URL not recognized, please enter a correct YouTube URL';
      return;
    }

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
   * TODO
   */
  public saveBookmark() {}

  /**
   * Save URL into bookmarks
   */
  public async storeUrl(url: string) {
    // Display button to toggle bookmarks panel
    this.bookmarkAvailable = true;
    // Store URL localy
    this.url = url;
    // Store URL in state to be accessible for other components
    this.state.url = this.url;

    const response = await this.storeUrlInDatabase();
    if (response && Object.values(response).length) {
      this.storeUrlInLocalStorage(response);
      console.warn('response from database : ', response, response.videoUrl);
      this.updateHistoryPanel();
    }
  }

  /**
   * Store the URL in the database with a post request
   */
  public async storeUrlInDatabase() {
    if (!!this.state.url) {
      try {
        console.warn('before post request');
        const response = await this.clientApi.post<History>({
          route: 'http://localhost:8000/history',
          videoUrl: this.url,
        });
        console.warn('response : ', response);
        return response;
      } catch (err) {
        console.error(err);
      }
    }
  }

  /**
   * Store the new history in the localStorage (to be improved)
   */
  public storeUrlInLocalStorage(newHistory: History) {
    // Get histories from cache
    const historyCached = window.localStorage.getItem(historyLocalStorage);
    const histories = JSON.parse(historyCached) as History[];
    console.warn('histories cached : ', histories);

    // Add new history into cache
    histories.push(newHistory);
    window.localStorage.setItem(historyLocalStorage, JSON.stringify(histories));
  }

  /**
   * Trick to update history panel with observable (to be improved)
   */
  public updateHistoryPanel() {
    console.warn('Passes in update');
    this.state.showHistory = false;
    setTimeout(() => {
      this.state.showHistory = true;
    }, 1);
  }
}
