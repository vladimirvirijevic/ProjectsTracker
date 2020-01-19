import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  username = 'Guest';
  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
  }

}
