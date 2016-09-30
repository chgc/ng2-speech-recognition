import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('500ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class CurrentComponent implements OnInit {

  constructor(private af: AngularFire) { }
  currentspeech: FirebaseObjectObservable<any>;
  finalspeech: FirebaseObjectObservable<any>;

  ngOnInit() {
    this.currentspeech = this.af.database.object('/current');
    this.finalspeech = this.af.database.object('/final');
  }

}
