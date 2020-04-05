import { Component } from '@angular/core';
import { State } from '../../services/state.service';

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

  constructor(private state: State) {}

  /**
   * Key handler
   * Only submit input if enter key is pressed
   * Save URL if correct in global state to be accessible to other components
   */
  public onKey(event: any) {
    this.resetInput();

    if (event.key !== 'Enter') {
      return;
    }

    const url = event.target.value.split(youtubeParser);
    console.warn('Search-bar URL : ', url);

    if (!url[1]) {
      this.inputError =
        'URL not recognized, please enter a correct YouTube URL';
      return;
    }

    this.bookmarkAvailable = true;
    this.url = url[1];
    this.state.url = this.url;
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
}
