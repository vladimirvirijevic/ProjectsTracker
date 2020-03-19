import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {
  changeUsernameForm: FormGroup;
  username = '';

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;

    this.changeUsernameForm = this.fb.group({
      'newUsername': ['', Validators.required]
    });
  }

  get newUsername() { return this.changeUsernameForm.get('newUsername'); }

  onChangeUsername() {
    if (!this.newUsername) {
      return null;
    }

    // moramo praviti objekat jer ne mozemo posalti sam string, dobicemo 415 error
    const userInfo = {
      newUsername: this.newUsername.value
    } 

    this.userService.changeUsername(userInfo).subscribe();
  }
}
