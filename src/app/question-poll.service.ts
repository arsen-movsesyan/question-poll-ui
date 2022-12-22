import {Injectable} from "@angular/core";
import {Question} from "./models/question.model";
import {HttpClient} from "@angular/common/http";
import {ASK_QUESTION_URL, VOTE_URL} from "./urls";

@Injectable()
export class QuestionPollService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  vote(questionId: string, upDown: boolean) {
    return this.httpClient.post(VOTE_URL, {question_id: questionId, up_down: upDown});
  }

  askQuestion(question: string) {
    return this.httpClient.post<Question>(ASK_QUESTION_URL, {question});
  }
}
