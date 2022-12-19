import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../models/question.model";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {QuestionPollService} from "../../../question-poll.service";

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
  userName: string;
  buttonDisabled: boolean = false;

  thumbsUpIcon = faThumbsUp;
  thumbsDownIcon = faThumbsDown;

  constructor(
    private questionPollService: QuestionPollService
  ) { }

  ngOnInit(): void {
    this.userName = this.username!;
    this._calculateButtonClassAndState();
  }

  vote(upDown: boolean) {
    this.questionPollService.vote(this.question._id, upDown)
      .subscribe(() => {
        if (upDown) {
          if (this.question.voted_up.includes(this.userName)) {
            const index = this.question.voted_up.indexOf(this.userName);
            this.question.voted_up.splice(index, 1);
          } else if (this.question.voted_down.includes(this.userName)) {
            const index = this.question.voted_down.indexOf(this.userName);
            this.question.voted_down.splice(index, 1);
            this.question.voted_up.push(this.userName);
          } else {
            this.question.voted_up.push(this.userName);
          }
        } else {
          if (this.question.voted_down.includes(this.userName)) {
            const index = this.question.voted_down.indexOf(this.userName);
            this.question.voted_down.splice(index, 1);
          } else if (this.question.voted_up.includes(this.userName)) {
            const index = this.question.voted_up.indexOf(this.userName);
            this.question.voted_up.splice(index, 1);
            this.question.voted_down.push(this.userName);
          } else {
            this.question.voted_down.push(this.userName);
          }
        }
        this._calculateButtonClassAndState();
      });
  }

  _calculateButtonClassAndState() {
    this.buttonDisabled = !this.username || this.question.submitted_by === this.username;
    this.upButtonClass = this.question.voted_up.includes(this.userName) ? 'btn-outline-success' : 'btn-success';
    this.downButtonClass = this.question.voted_down.includes(this.userName) ? 'btn-outline-secondary' : 'btn-secondary';
  }
}
