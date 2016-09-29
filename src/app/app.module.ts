import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SpeechRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { CurrentComponent } from './current/current.component';
import { SpeechComponent } from './speech/speech.component';
// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyAw4fnkCxiRYn84-F7KH2t1tFIvsLDmqvQ",
  authDomain: "speech-58d7a.firebaseapp.com",
  databaseURL: "https://speech-58d7a.firebaseio.com",
  storageBucket: "speech-58d7a.appspot.com",
  messagingSenderId: "539491812340"
};

@NgModule({
  declarations: [
    AppComponent,
    CurrentComponent,
    SpeechComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SpeechRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
