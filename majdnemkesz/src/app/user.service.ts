import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // mivel a service Singleton, ezért alkalmas különböző értékek, adatok megosztására is
  private userLogin = false;
  constructor() {}

  loginUser() {
    this.userLogin = true;
  }

  getUser() {
    return this.userLogin;
  }
}
