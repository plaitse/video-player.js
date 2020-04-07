import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _url = new BehaviorSubject<string>('');
  private readonly youtubeUrlPrefix: string = 'https://www.youtube.com/embed/';
  private readonly _showHistory = new BehaviorSubject<boolean>(false);

  // Rxjs observable pattern - Expose the observable$ part of the _url subject (read only stream)
  public readonly url$ = this._url.asObservable();
  public readonly showHistory$ = this._showHistory.asObservable();

  // Getter returns the last value emitted in _url subject
  public get url(): string {
    return this._url.getValue();
  }
  public get showHistory(): boolean {
    return this._showHistory.getValue();
  }

  // Assignig a value to this.url pushes it onto the observable and down to all of its subsribers
  public set url(val: string) {
    const fullUrl = val ? this.youtubeUrlPrefix + val : val;
    this._url.next(fullUrl);
  }

  public set showHistory(val: boolean) {
    this._showHistory.next(val);
  }
}
