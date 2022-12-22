import {Component, OnInit} from '@angular/core';
import {Question} from "../../models/question.model";
import {AuthService} from "../../auth.service";
import {QuestionPollService} from "../../question-poll.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: Question[] | null;
  username: string|null;
  showSpinner = false;

  constructor(
    private authService: AuthService,
    private questionService: QuestionPollService
  ) {
    this.authService.isAuth.subscribe(authenticated => {
      this.username = authenticated ? this.authService.getUser() : null;
    });
  }

  ngOnInit(): void {
  }

  addNewQuestion(newQuestion: Question) {
    if (!this.questions) {
      this.questions = [newQuestion];
    } else {
      this.questions.push(newQuestion);
    }
  }
}
