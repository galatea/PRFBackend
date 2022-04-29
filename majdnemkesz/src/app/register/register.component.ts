import { Component, OnInit } from '@angular/core';
import {LoginService} from "../utils/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username= '';
  password= '';
  email = '';

  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.password = '';
    this.password = '';
  }

  register(){
    if(this.username != '' &&  this.password != '' && this.email != ''){
      this.loginService.register(this.username, this.password, this.email).subscribe(msg => {
        console.log(msg);
        this.router.navigate(['/login'])
      }, error => {
        console.log(error);
      })
    }
  }

  ngOnInit(): void {
//     if(localStorage.getItem('user')) {
//       localStorage.removeItem('user');
//       this.loginService.logout().subscribe(msg => {
//         console.log(msg);
//       }, error => {
//         console.log(error);
//       })
// ;    }
  }

}
