import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DirectorateService } from '../../../Services/directorates/directorate.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DirectorateService],
  bootstrap: []
})
export class AppModule {}