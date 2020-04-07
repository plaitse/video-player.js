import { Component, OnInit } from '@angular/core';
import { State } from '../../services/state.service';

export interface History {
  _id?: string;
  videoUrl: string;
  date?: Date;
}

export const historyLocalStorage = 'historyCached';
export const historyRoute = 'http://localhost:8000/history';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  public histories: History[] = [];

  constructor(private state: State) {}

  /**
   * Fetch all histories from localStorage on component's init
   */
  public async ngOnInit() {
    console.warn('Passes in ngOnInit History');
    const historyCached = window.localStorage.getItem(historyLocalStorage);

    if (!!historyCached) {
      this.histories = (JSON.parse(historyCached) as History[]).reverse();
    }
  }

  /**
   * Select a specific URL saved in the history panel
   */
  public selectHistoryUrl(url: string) {
    if (!url) {
      return;
    }
    this.state.url = url;
  }
}
