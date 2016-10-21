import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SpeechRoutingModule } from './app-routing.module';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

import { AppComponent } from './app.component';
import { CurrentComponent } from './current/current.component';
import { SpeechComponent } from './speech/speech.component';
// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyA46q2b376YbXzXKZHtucF84BGJsLRVX5M",
  authDomain: "speech-ef887.firebaseapp.com",
  databaseURL: "https://speech-ef887.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "439204197340"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Anonymous,
  method: AuthMethods.Anonymous
}

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
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
