export interface Question {
  _id: string,
  submitted_by: string,
  submitted_at: string,
  question: string,
  voted_up: string[],
  voted_down: string[]
}
