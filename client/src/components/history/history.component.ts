import { Component, OnInit } from '@angular/core';
import { ApiClient } from '../../services/api-client.service';
import { State } from '../../services/state.service';

interface History {
  _id: string;
  videoUrl: string;
  date: Date;
}

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  public histories: History[] = [];

  constructor(private apiClient: ApiClient, private state: State) {}

  /**
   * Fetch all histories on component's init
   */
  public async ngOnInit() {
    try {
      this.histories = await this.apiClient.get<History[]>({
        route: 'http://localhost:8000/history',
      });
      console.warn('length :', this.histories.length);
      console.warn('histories :', this.histories);
    } catch (err) {
      console.error(err);
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
