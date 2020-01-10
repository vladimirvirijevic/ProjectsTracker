import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authType = '';
  title = '';
  authForm: FormGroup;
  bottomTextDescription = '';
  bottomTextLink = '';
  bottomTextPath = '';
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.authForm = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(3)]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(
      route => {
        this.authType = route[route.length - 1].path;

        if (this.authType === 'login') {
          this.title = 'Sign In';
          this.bottomTextDescription = 'Don`t have account yet?';
          this.bottomTextLink = 'Sign Up';
          this.bottomTextPath = 'register';
        } else {
          this.title = 'Sign Up';
          this.bottomTextDescription = 'Already have an account?';
          this.bottomTextLink = 'Sign In';
          this.bottomTextPath = 'login';
        }
      }
    );

    if (this.authType === 'register') {
      this.authForm.addControl('email', new FormControl());
      this.authForm.controls['email'].setValidators([Validators.required, Validators.email]);
    }
  }

  get username() { return this.authForm.get('username'); }
  get password() { return this.authForm.get('password'); }
  get email() { return this.authForm.get('email'); }

  submitForm() {
    this.submitted = true;

    if (this.authForm.invalid) {
      return;
    }

  }
}
