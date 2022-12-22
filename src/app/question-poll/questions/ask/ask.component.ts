import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

  constructor(
    private authService: AuthService,
    private questionService: QuestionPollService
  ) {
    this.authService.isAuth.subscribe(authenticated => {
      this.username = authenticated ? this.authService.getUser() : null;
    });
  }

  ngOnInit(): void {
    this.questionFormGroup = new FormGroup({
      questionBody: new FormControl(null, [Validators.required, Validators.minLength(20)]),
    });
  }

  submitQuestion() {
    const questionBody = this.questionFormGroup.value.questionBody;
    this.showSpinner = true;
    this.questionService.askQuestion(questionBody)
      .subscribe((addedQuestion: Question) => {
        this.newQuestion.emit(addedQuestion);
        this.questionFormGroup.reset();
        this.showSpinner = false;
      });
  }
}
