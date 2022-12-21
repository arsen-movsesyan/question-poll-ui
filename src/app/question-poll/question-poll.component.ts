import { Component, OnInit } from '@angular/core';
import {Topic} from "../models/topic.model";
import {QuestionPollService} from "../question-poll.service";

@Component({
  selector: 'app-question-poll',
  templateUrl: './question-poll.component.html',
  styleUrls: ['./question-poll.component.css']
})
export class QuestionPollComponent implements OnInit {
  selectedTopic: Topic;
  // questions: any;
  showSpinner = true;
  topics: Topic[];


  constructor(
    private questionService: QuestionPollService
  ) {}

  ngOnInit(): void {
    this.questionService.getAllTopics()
      .subscribe((allTopics: Topic[]) => {
        this.topics = allTopics;
        this.selectedTopic = this.topics[0];
        this.questionService.currentTopicSubj.next(this.selectedTopic);
        this.showSpinner = false;
      })

  }

  onSelectTopic(topicId: number) {
    this.selectedTopic = this.topics.find(t => t.id === topicId) || this.topics[0];
    this.questionService.currentTopicSubj.next(this.selectedTopic);
  }

  // tmpPostQuestions() {
  //   this.questionService.tmpTransferQuestions();
  // }
}
