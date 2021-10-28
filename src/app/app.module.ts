import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EstimateProgressPipe } from './estimate-progress.pipe';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, EstimateProgressPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
