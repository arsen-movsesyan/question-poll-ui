import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Topic} from "../../../models/topic.model";
import {QuestionPollService} from "../../../question-poll.service";
import {Question} from "../../../models/question.model";

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {
  @Output() newQuestion: EventEmitter<Question> = new EventEmitter<Question>();
  username: string|null;
  questionFormGroup: FormGroup;
  showSpinner = false;
  currentTopic: Topic;

  constructor(
    private authService: AuthService,
    private questionService: QuestionPollService
  ) {
    this.authService.isAuth.subscribe(authenticated => {
      this.username = authenticated ? this.authService.getUser() : null;
    });
    this.questionService.currentTopicSubj.subscribe(t => this.currentTopic = t);
  }

  ngOnInit(): void {
    this.questionFormGroup = new FormGroup({
      questionBody: new FormControl(null, [Validators.required, Validators.minLength(20)]),
    });
  }

  submitQuestion() {
    const questionBody = this.questionFormGroup.value.questionBody;
    const topicId = this.currentTopic.id;
    this.showSpinner = true;
    this.questionService.askQuestion(questionBody, topicId)
      .subscribe((addedQuestion: Question) => {
        this.newQuestion.emit(addedQuestion);
        this.questionFormGroup.reset();
        this.showSpinner = false;
      });
  }
}
