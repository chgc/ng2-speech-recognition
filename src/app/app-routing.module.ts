import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentComponent } from './current/current.component';
import { SpeechComponent } from './speech/speech.component'
const routes: Routes = [
  { path: 'current', component: CurrentComponent },
  { path: '**', component: SpeechComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class SpeechRoutingModule { }
