import { Component, NgZone, OnInit } from '@angular/core';
import { Observable, Subscription, Observer } from 'rxjs/Rx';
import 'rxjs/Rx';

declare let webkitSpeechRecognition: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Speed Demo';
  recognition: any;
  sentencces: string[] = [];
  isReading: boolean = false;
  recognitionStarted: boolean = false;
  people$: Observable<any>;

  constructor(private zone: NgZone) {
  }

  ngOnInit() {
    this.recognition = new webkitSpeechRecognition();
    this.clear();
    this.people$ = this.speech();
  }

  clear() {
    this.sentencces = [];
  }

  speech(): Observable<string[]> {
    return Observable.create((observer) => {
      this.recognition.onresult = (e) => {
        observer.next(e.results.item(e.results.length - 1));
        this.zone.run(() => { })
      };
      this.recognition.onerror = (e) => this.zone.run(() => observer.error(e));
      this.recognition.onend = (e) => this.zone.run(() => observer.complete());

      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = "cmn-Hant-TW";
      if (!this.recognitionStarted) {
        this.recognition.start();
        this.recognitionStarted = true;
      }
    }).do(data => {
      this.isReading = !data.isFinal;
    }).map(data => {
      if (data.isFinal) {
        this.sentencces.push(data.item(0).transcript);
        return '';
      } else {
        return data.item(0).transcript;
      }
    });
  }
}
