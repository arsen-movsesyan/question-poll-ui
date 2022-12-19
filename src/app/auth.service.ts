import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthModel} from "./models/auth.model";
import {LOGIN_URL} from "./urls";
import {BehaviorSubject, tap} from "rxjs";
import {
  deleteAuthTokenFromLocalStorage, deleteUserFromLocalStorage, fetchUserFromLocalStorage,
  isAuthenticated,
  saveAuthTokenToLocalStorage,
  saveUserToLocalStorage
} from "./static-utils";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  isAuth = new BehaviorSubject<boolean|null>(null);
  username: string | null;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
  }

  autoLogin() {
    this.isAuth.next(isAuthenticated());
  }

  login(userEmail: string) {
    return this.httpClient.post<AuthModel>(LOGIN_URL, {username: userEmail})
      .pipe(tap((userInfo: AuthModel) => {
        if (!userInfo.error) {
          saveAuthTokenToLocalStorage(userInfo.data.token);
          saveUserToLocalStorage(userInfo.data.username)
          this.isAuth.next(true);
        }}),
      );
  }

  getUser() {
    this.username = fetchUserFromLocalStorage();
    return this.username;
  }

  logout() {
    deleteAuthTokenFromLocalStorage();
    deleteUserFromLocalStorage();
    this.isAuth.next(false);
    this.username = null;
    this.router.navigateByUrl('/').then();
  }

}
