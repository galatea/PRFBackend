import { HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
   // return this.http.post(environment.serverUrl + 'login', {username: username, password: password}, {responseType:'text'} );
   return this.http.post('/api/login', {username: username, password: password}, {responseType:'text'} );
  }
  logout(){
    return this.http.post('/api/logout', {},{withCredentials: true, responseType:'text'});

  }


  register(username: string, password: string, email: string){
    return this.http.post('/api/user', {username: username, password: password, email:email}, {responseType:'text'} );
  }
}
