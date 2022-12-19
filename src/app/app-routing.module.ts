import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {HowItWorksComponent} from "./how-it-works/how-it-works.component";
import {QuestionPollComponent} from "./question-poll/question-poll.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'how-it-works', component: HowItWorksComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'question-poll', component: QuestionPollComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
