import { Component, OnInit } from '@angular/core';
import { State } from 'src/services/state.service';

export const bookmarksLocalStorage = 'bookmarksCached';
export const bookmarksLocalStorageError =
  'Could not save bookmark in localStorage : ';

@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  public bookmarks: string[] = [];

  constructor(private state: State) {}

  public ngOnInit() {
    try {
      const bookmarksCached: string = window.localStorage.getItem(
        bookmarksLocalStorage
      );
      this.bookmarks =
        (JSON.parse(bookmarksCached) as string[]).reverse() || [];
    } catch (err) {
      throw new Error(bookmarksLocalStorageError + err);
    }
  }

  public selectBookmarksUrl(url: string) {
    this.state.url = url;
  }
}
