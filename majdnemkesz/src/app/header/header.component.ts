import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated : boolean;
  constructor(private router: Router) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
  }

  isLoggedIn() {
    if( localStorage.getItem('user')){
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    return this.isAuthenticated;
  }

}
