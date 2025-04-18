import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { HoverNavComponent } from './hover-nav/hover-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    HoverNavComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
