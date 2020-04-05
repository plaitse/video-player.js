import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _url = new BehaviorSubject<string>('');
  private readonly youtubeUrlPrefix: string = 'https://www.youtube.com/embed/';

  // Rxjs observable pattern - Expose the observable$ part of the _url subject (read only stream)
  public readonly url$ = this._url.asObservable();

  // Getter returns the last value emitted in _url subject
  public get url(): string {
    return this._url.getValue();
  }

  // Assignig a value to this.url pushes it onto the observable and down to all of its subsribers
  public set url(val: string) {
    const fullUrl = val ? this.youtubeUrlPrefix + val : val;
    this._url.next(fullUrl);
  }
}
