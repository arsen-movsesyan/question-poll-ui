import {Injectable} from "@angular/core";
import {Topic} from "./models/topic.model";
import {Question} from "./models/question.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ASK_QUESTION_URL, QUESTIONS_URL, TOPICS_URL, VOTE_URL} from "./urls";
import {fetchUserFromLocalStorage} from "./static-utils";

@Injectable()
export class QuestionPollService {

  currentTopicSubj = new Subject<Topic>();
  allQuestions: Question[];
  topics: Topic[];

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAllTopics() {
    return this.httpClient.get<Topic[]>(TOPICS_URL);
  }

  getQuestionByTopic(topicId: number) {
    const url = QUESTIONS_URL + '?topic_id=' + topicId.toString();
    return this.httpClient.get<Question[]>(url);
  }

  getAllQuestions() {
    return this.allQuestions;
  }

  vote(questionId: string, upDown: boolean) {
    return this.httpClient.post(VOTE_URL, {question_id: questionId, up_down: upDown});
  }

  askQuestion(question: string, topicId: number) {
    return this.httpClient.post<Question>(ASK_QUESTION_URL, {question, topic_id: topicId});
  }

  // tmpTransferQuestions() {
  //   return this.httpClient.post('http://localhost:5000/post-questions', this.getAllTopics()).
  //     subscribe();
  // }
}
