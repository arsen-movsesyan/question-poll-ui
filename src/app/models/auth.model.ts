import {UserModel} from "./user.model";

export interface AuthModel {
  message: string,
  error: string,
  data: UserModel
}
