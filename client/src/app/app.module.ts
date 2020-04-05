// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../routing/app-routing.module';

// Components
import { AppRoot } from './app-root';
import { BookmarksComponent } from '../components/bookmarks/bookmarks.component';
import { HistoryComponent } from '../components/history/history.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { VideoViewComponent } from '../components/video-view/video-view.component';

// Material design
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppRoot,
    BookmarksComponent,
    HistoryComponent,
    SearchBarComponent,
    VideoViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppRoot],
})
export class AppModule {}
