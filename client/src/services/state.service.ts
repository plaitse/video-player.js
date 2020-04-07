import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const youtubeUrlPrefix: string = 'https://www.youtube.com/embed/';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _showBookmarks: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);
  private readonly _showHistory: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  private readonly _url: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  /**
   * Rxjs observable pattern - Expose the observable$ part of the subject (read only stream)
   */
  public readonly showBookmarks$: Observable<
    boolean
  > = this._showBookmarks.asObservable();
  public readonly showHistory$: Observable<
    boolean
  > = this._showHistory.asObservable();
  public readonly url$: Observable<string> = this._url.asObservable();

  /**
   * Getters return the last value emitted in subject
   */
  public get showBookmarks(): boolean {
    return this._showBookmarks.getValue();
  }
  public get showHistory(): boolean {
    return this._showHistory.getValue();
  }
  public get url(): string {
    return this._url.getValue();
  }

  /**
   * Assigning a value pushes it onto the observable and down to all of its subsribers
   */
  public set showBookmarks(val: boolean) {
    this._showBookmarks.next(val);
  }
  public set showHistory(val: boolean) {
    this._showHistory.next(val);
  }
  public set url(val: string) {
    const fullUrl = val ? youtubeUrlPrefix + val : val;
    this._url.next(fullUrl);
  }
}
