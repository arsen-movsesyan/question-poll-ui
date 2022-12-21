import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../models/question.model";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {QuestionPollService} from "../../../question-poll.service";
import {AuthService} from "../../../auth.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() username: string|null;
  upButtonClass: string;
  downButtonClass: string;
  buttonDisabled: boolean = false;

  thumbsUpIcon = faThumbsUp;
  thumbsDownIcon = faThumbsDown;

  constructor(
    private questionPollService: QuestionPollService,
    private authService: AuthService
  ) {
    this.authService.isAuth.subscribe(isAuth => {
      if (isAuth) {
        this.username = this.authService.getUser()!;
      } else {
        this.username = null;
      }
      this._calculateButtonClassAndState();
    })
  }

  ngOnInit(): void {
    this._calculateButtonClassAndState();
  }

  vote(upDown: boolean) {
    this.questionPollService.vote(this.question._id, upDown)
      .subscribe(() => {
        if (upDown) {
          if (this.question.voted_up.includes(this.username!)) {
            const index = this.question.voted_up.indexOf(this.username!);
            this.question.voted_up.splice(index, 1);
          } else if (this.question.voted_down.includes(this.username!)) {
            const index = this.question.voted_down.indexOf(this.username!);
            this.question.voted_down.splice(index, 1);
            this.question.voted_up.push(this.username!);
          } else {
            this.question.voted_up.push(this.username!);
          }
        } else {
          if (this.question.voted_down.includes(this.username!)) {
            const index = this.question.voted_down.indexOf(this.username!);
            this.question.voted_down.splice(index, 1);
          } else if (this.question.voted_up.includes(this.username!)) {
            const index = this.question.voted_up.indexOf(this.username!);
            this.question.voted_up.splice(index, 1);
            this.question.voted_down.push(this.username!);
          } else {
            this.question.voted_down.push(this.username!);
          }
        }
        this._calculateButtonClassAndState();
      });
  }

  _calculateButtonClassAndState() {
    if (!!this.question) {
      this.buttonDisabled = !this.username || this.question.submitted_by === this.username;
      this.upButtonClass = this.question.voted_up.includes(this.username!) ? 'btn-outline-success' : 'btn-success';
      this.downButtonClass = this.question.voted_down.includes(this.username!) ? 'btn-outline-secondary' : 'btn-secondary';
    }
  }
}
