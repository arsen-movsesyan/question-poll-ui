import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faCode} from "@fortawesome/free-solid-svg-icons/faCode";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('signIn') signIn: ElementRef;
  signInModal: NgbActiveModal;
  codeIcon = faCode;
  loginForm: FormGroup;
  username: string|null;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.authService.isAuth.subscribe((authenticated) => {
      this.username = authenticated ? this.authService.getUser() : null;
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      // password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  openSignInModal() {
    this.signInModal = this.modalService.open(this.signIn);
  }

  closeSignInModal() {
    this.signInModal.close();
    this.loginForm.reset();
  }

  login() {
    this.authService.login(this.loginForm.value['username'])
      .subscribe(() => {
        this.closeSignInModal();
        this.username = this.authService.getUser();
      });
  }

  logout() {
    this.authService.logout();
    this.username = null;
  }
}
