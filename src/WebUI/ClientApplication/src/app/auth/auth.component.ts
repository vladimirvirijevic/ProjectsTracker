import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { RegisterModel } from '../_models/registerModel';

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
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

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

      this.authForm.addControl('firstName', new FormControl());
      this.authForm.controls['firstName'].setValidators([Validators.required]);

      this.authForm.addControl('lastName', new FormControl());
      this.authForm.controls['lastName'].setValidators([Validators.required]);
    }

    this.returnUrl = '/app/projects';
  }

  get username() { return this.authForm.get('username'); }
  get password() { return this.authForm.get('password'); }
  get email() { return this.authForm.get('email'); }
  get firstName() { return this.authForm.get('firstName'); }
  get lastName() { return this.authForm.get('lastName'); }

  onSubmit() {
    this.submitted = true;

    if (this.authForm.invalid) {
      return;
    }

    if (this.authType === 'login') {
      this.authenticationService.login(this.username.value, this.password.value)
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      console.log(this.authForm.value);

      const newUser: RegisterModel = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        username: this.username.value,
        password: this.password.value,
        email: this.email.value
      };

      this.userService.register(newUser)
        .subscribe(
          data => {
            this.router.navigate(['/login']);
          },
          error => {
            console.log(error);
          }
        );
      }
  }
}
