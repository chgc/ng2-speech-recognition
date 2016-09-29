import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  constructor(private af: AngularFire) { }
  currentspeech: FirebaseObjectObservable<any>;

  ngOnInit() {
    this.currentspeech = this.af.database.object('/current');
  }

}
