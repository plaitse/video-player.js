import { Component } from '@angular/core';
import { ApiClient } from '../../services/api-client.service';
import { State } from '../../services/state.service';

interface History {
  videoUrl: string;
}

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

  constructor(private apiClient: ApiClient, private state: State) {}

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
   * Save URL into bookmarks
   */
  public saveBookmark() {}

  public async storeUrl(url: string) {
    // Display button to toggle bookmarks panel
    this.bookmarkAvailable = true;
    // Store URL localy
    this.url = url;
    // Store URL in state to be accessible for other components
    this.state.url = this.url;

    const response = await this.storeUrlInDatabase();
    console.warn('response from database : ', response, response.videoUrl);
    this.storeUrlInLocalStorage(response);
  }

  /**
   * Store the URL in the database with a post request
   */
  public async storeUrlInDatabase() {
    if (!!this.state.url) {
      console.warn('before post request');
      // Store URL in database
      const response = await this.apiClient.post<History>({
        route: 'http://localhost:8000/history',
        videoUrl: this.url,
      });
      console.warn('response : ', response);
      return response;
    }
  }

  /**
   * Store the new history in the localStorage by concatenating the histories
   */
  public storeUrlInLocalStorage(response) {
    if (response && Object.values(response)) {
      const histories = window.localStorage.getItem('histories');
      if (!histories) {
        window.localStorage.setItem('histories', response.videoUrl);
      } else {
        const newHistories = histories + '|' + response.videoUrl;
        window.localStorage.setItem('histories', newHistories);
      }
    }
  }
}
