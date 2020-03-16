import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  username = 'Guest';
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeDropdown();
    this.username = this.authService.currentUserValue.username;
  }

  initializeDropdown() {
    $(document).ready(function(){
      $('.dropdown-trigger').dropdown();
    });
  }

  logoutUser() {
    this.authService.logout();
  }
}
