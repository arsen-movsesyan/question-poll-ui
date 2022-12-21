import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../models/question.model";
import {Topic} from "../../models/topic.model";
import {AuthService} from "../../auth.service";
import {QuestionPollService} from "../../question-poll.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: Question[] | null;
  currentTopic: Topic;
  username: string|null;
  showSpinner = false;

  constructor(
    private authService: AuthService,
    private questionService: QuestionPollService
  ) {
    this.authService.isAuth.subscribe(authenticated => {
      this.username = authenticated ? this.authService.getUser() : null;
    });
    this.questionService.currentTopicSubj.subscribe(selectedTopic => {
      this.currentTopic = selectedTopic;
      this.showSpinner = true;
      this.questions = null;
      this.questionService.getQuestionByTopic(this.currentTopic.id)
        .subscribe((questions: Question[]) => {
          this.questions = questions;
          this.showSpinner = false;
        });
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
