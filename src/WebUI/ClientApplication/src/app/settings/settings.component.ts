import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      'newPassword': ['', Validators.required],
      'oldPassword': ['', Validators.required]
    });
  }

  get newPassword() { return this.changePasswordForm.get('newPassword'); }
  get oldPassword() { return this.changePasswordForm.get('oldPassword'); }

  onChangePassword() {
    if (!this.newPassword) {
      return null;
    }

    const userInfo = {
      newPassword: this.newPassword.value,
      oldPassword: this.oldPassword.value
    } 

    this.userService.changePassword(userInfo).subscribe(
      () => this.authService.logout()
    );
  }
}
