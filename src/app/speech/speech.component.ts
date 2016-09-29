import { Component, NgZone, OnInit } from '@angular/core';
import { Observable, Subscription, Observer } from 'rxjs/Rx';
import 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare let webkitSpeechRecognition: any;
declare let document: any;

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.css']
})
export class SpeechComponent implements OnInit {
  title = 'Speech Recognition Demo';
  recognition: any;
  sentencces: string[] = [];
  isReading: boolean = false;
  recognitionStarted: boolean = false;
  voice$: Observable<any>;
  currentspeech: FirebaseObjectObservable<any>;
  finalspeech: FirebaseObjectObservable<any>;

  constructor(private zone: NgZone, private af: AngularFire) {
  }

  ngOnInit() {
    this.recognition = new webkitSpeechRecognition();
    this.clear();
    this.voice$ = this.speech();
    this.currentspeech = this.af.database.object('/current');
    this.finalspeech = this.af.database.object('/final');
  }

  restart() {
    this.voice$ = this.speech();
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
      this.recognition.onerror = (e) => this.zone.run(() => {
        observer.error(e)
      });
      this.recognition.onend = (e) => this.zone.run(() => {
        observer.complete()
        this.recognitionStarted = false;
        this.restart();
      });

      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = "cmn-Hant-TW";
      if (!this.recognitionStarted) {
        this.recognition.start();
        this.recognitionStarted = true;
      }
    }).retry(10)
      .do(data => {
        this.isReading = !data.isFinal;
      })
      .map(data => {
        if (data.isFinal) {
          this.sentencces.push(data.item(0).transcript);
          let ss = data.item(0).transcript;
          ss = ss.replace("逗號", "，");
          ss = ss.replace("句號", "。");
          console.log(ss);
          this.finalspeech.set(ss);
          this.currentspeech.set('');
          return '';
        } else {
          let ss = data.item(0).transcript;
          ss = ss.replace("逗號", "，");
          ss = ss.replace("句號", "。");
          this.currentspeech.set(ss);
          return data.item(0).transcript;
        }
      });
  }
}
