import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from "./app-routing.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { QuestionPollComponent } from './question-poll/question-poll.component';
import {QuestionPollService} from "./question-poll.service";
import { QuestionsComponent } from './question-poll/questions/questions.component';
import { QuestionComponent } from './question-poll/questions/question/question.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./auth.service";
import {JwtModule} from "@auth0/angular-jwt";
import {fetchAuthTokenFromLocalStorage} from "./static-utils";
import {JWT_ALLOWED_DOMAINS, JWT_DISALLOWED_ROUTES} from "./urls";
import {HttpClientModule} from "@angular/common/http";
import { AskComponent } from './question-poll/questions/ask/ask.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HowItWorksComponent,
    QuestionPollComponent,
    QuestionsComponent,
    QuestionComponent,
    AskComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: fetchAuthTokenFromLocalStorage,
        allowedDomains: JWT_ALLOWED_DOMAINS,
        disallowedRoutes: JWT_DISALLOWED_ROUTES,
        authScheme: 'JWT '
      }
    }),
    HttpClientModule
  ],
  providers: [
    QuestionPollService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
